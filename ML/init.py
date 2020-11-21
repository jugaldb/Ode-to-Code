import csv
import numpy
import copy
from collections import Counter
from scipy import spatial
from sklearn import metrics 
#import plot_results as plt
import sys

recipe_to_look = sys.argv[1]
print(recipe_to_look)
cosine_similarity_threshold = -1

# Flattens an array
def flat(arr):
  return filter(lambda x: x, [y for x in arr for y in x])


def get_recipe_attributes(recipe):
  keys = filter(lambda key: key != 'title' and key != 'rating', recipe.keys())
  print("Keys:")
  #print(list(keys))
  return map(lambda x: recipe[x] or 0, keys)

def normalize_vectors(attrs, attrs2):
  vector1 = []
  vector2 = []
  for idx, val in enumerate(attrs):
    # We skip the attributes for which both recipes have zero value
    if attrs2[idx] == 0 and val == 0:
      continue
    else:
      vector1.append(1)
      vector2.append(0)
      if(val == attrs2[idx]):
        vector2[-1] = 1
  return vector1, vector2


def map_attrs_to_ints(recipe, dict):
  return map(lambda x: dict[x], get_recipe_attributes(recipe))


with open('epi_r.csv', encoding="utf8") as tsvfile:
  reader = csv.DictReader(tsvfile, delimiter=',')
  print()
  filtered = filter(lambda p: p, reader)
  filt = filter(lambda p: p, reader)
  print("filt")
  #print(list(filt)[1:3])
  recipe_to_look = list(filter(lambda p: recipe_to_look in p['title'], filtered))[0]
  #print(recipe_to_look)
  '''filt_new = list(filt)[0:20]
  print("newfilt: ", filt_new)'''

  attrs = list(map(lambda x: float(x), get_recipe_attributes(recipe_to_look)))
  
  #print(attrs)
  similar_recipes = []
  #print("filtered", list(filtered))
  
  for rec2 in list(filt)[1:10]:
    attrs2 = list(map(lambda x: float(x), get_recipe_attributes(rec2)))
    vc1, vc2 = normalize_vectors(attrs, attrs2)
    print("vec 1 and 2", vc1,vc2)
    cosine_similarity = 1 - spatial.distance.cosine(vc1, vc2)

    if(cosine_similarity > cosine_similarity_threshold and recipe_to_look['title'] != rec2['title']):
      rec2['cosine_similarity'] = cosine_similarity
      # print(rec2['cosine_similarity'], rec2['title'], attrs, attrs2, vc1, vc2)
      print("rec2")
      print(rec2)
      similar_recipes.append(rec2)

  similar_recipes = sorted(similar_recipes, key=lambda x: x['cosine_similarity'])[:100]
  print(similar_recipes)

  #plt.draw(similar_recipes, 'cosine_similarity', recipe_to_look['title'])
