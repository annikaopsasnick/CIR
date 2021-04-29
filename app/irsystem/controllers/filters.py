import pandas as pd
import os
import numpy as np
import nltk
import re
from nltk.tokenize import TreebankWordTokenizer
from nltk.corpus import stopwords

from app.irsystem.controllers.jaccard import jaccard
from .jaccard_helper import df, tokenized_df,sim_feature_weights, clean_query, n_cocktails, sm_df

# data_file = os.path.join(os.path.dirname(__file__), "dataset.csv")

# df = pd.read_csv(data_file)

def containsWords(row, words):
    contains = False
    for term in words:
        if term in row:
            contains = True
    return contains

# terms for filters
iced_terms = ['iced', 'ice', 'chilled', 'frozen', 'summer']
hot_terms = ['hot', 'heated', 'warm']
def icedHot(query, inputs, iced, hot):
    indexes_include = []

    for idx,drink in enumerate(inputs):
      include = False
      if iced == True:
        if containsWords(inputs[idx], iced_terms) and not containsWords(inputs[idx], hot_terms):
         include = True
      elif hot == True:
        if containsWords(inputs[idx], hot_terms) and not containsWords(inputs[idx], iced_terms):
          include = True

      if include == True:
        indexes_include.append(idx)
    
    print(indexes_include)
    return jaccard(query, tokenized_df.copy(),sim_feature_weights, indexes_include,)

def ingredientBoolean(inputs, contains, excludes):
    indexes_include = []
    
    for idx,drink in enumerate(inputs):
        drink_tokens = [token.lower() for token in inputs[idx]]

        include = True
        for contain in contains:
            if contain not in drink_tokens:
                include = False
        for exclude in excludes:
            if exclude in drink_tokens:
                include = False
        if include == True: 
            indexes_include.append(idx)
        
    return indexes_include
# spirit_dict = {
#   'vodka': ["vodka"],
#   'tequila': ["tequila"],
#   'gin': ["gin"],
#   'rum': ["rum"],
#   'whiskey': ["tequila"],
#   'gin': ["gin"],

# }
def base_spirit(spirit, df=df):
    indexes_include = []
    
    for idx in range(len(df)):
      if spirit in df.loc[idx, ['base_spirits']][0]:
        indexes_include.append(idx)
    
    return indexes_include
    
def filters(query, sm_df, iced, hot, spirit):
  indexes_spirit = base_spirit(spirit)
  indexes_temp = icedHot(query, sm_df, iced, hot)
  indexes_include = [value for value in indexes_spirit if value in indexes_temp]

  return jaccard(query, tokenized_df.copy(),sim_feature_weights, indexes_include)
