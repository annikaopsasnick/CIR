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
def icedHot(indexes, inputs, iced, hot):
    indexes_include = []

    for idx in range(len(df)):
      if idx in indexes:
        include = False
        if iced == True:
          if containsWords(inputs[idx], iced_terms) and not containsWords(inputs[idx], hot_terms):
            include = True
        elif hot == True:
          if containsWords(inputs[idx], hot_terms) and not containsWords(inputs[idx], iced_terms):
            include = True

        if include == True:
          indexes_include.append(idx)
    
    return indexes_include

# def ingredientBoolean(inputs, contains, excludes):
#     indexes_include = []
    
#     for idx,drink in enumerate(inputs):
#         drink_tokens = [token.lower() for token in inputs[idx]]

#         include = True
#         for contain in contains:
#             if contain not in drink_tokens:
#                 include = False
#         for exclude in excludes:
#             if exclude in drink_tokens:
#                 include = False
#         if include == True: 
#             indexes_include.append(idx)
        
#     return indexes_include
# spirit_dict = {
#   'vodka': ["vodka"],
#   'tequila': ["tequila"],
#   'gin': ["gin"],
#   'rum': ["rum"],
#   'whiskey': ["tequila"],
#   'gin': ["gin"],

# }
def base_spirit(indexes, spirit, df=df):
    indexes_include = []
    
    for idx in range(len(df)):
      if idx in indexes:
        if spirit in df.loc[idx, ['base_spirits']][0]:
          indexes_include.append(idx)
    return indexes_include


def season_filter(indexes, season, df=df):
    indexes_include = []
    
    for idx in range(len(df)):
      if idx in indexes:
        if season == df.loc[idx, ['season']][0]:
          indexes_include.append(idx)
    return indexes_include

def easy_filter(indexes, df=df):
    indexes_include = []
    
    for idx in range(len(df)):
      if idx in indexes:
        if df.loc[idx, ['ingredients']][0].count(',') <= 4:
          indexes_include.append(idx)
    return indexes_include

def tagNo_filter(indexes, inputs, tags, df=df):
    indexes_include = []

    words = [tag['name'].lower() for tag in tags]

    # adding plurals to word list
    for tag in tags:
      words.append(tag['name'].lower() + "s")
      words.append(tag['name'].lower() + "es")
      words.append(tag['name'].lower()[:-1] + "ies")


    print("words", words)
    
    for idx in range(len(df)):
      if idx in indexes:
        include = True
        if containsWords(inputs[idx], words):
          include = False
        if include:
          indexes_include.append(idx)
    return indexes_include

def tagYes_filter(indexes, inputs, tags, df=df):
    indexes_include = []

    words = [tag['name'].lower() for tag in tags]
    
    for idx in range(len(df)):
      if idx in indexes:
        include = True
        if not containsWords(inputs[idx], words):
          include = False
        if include:
          indexes_include.append(idx)
    return indexes_include
    
def filters(query, sm_df, iced, hot, spirit, season, easy, tagsNo, tagsYes):
  print(spirit, season, easy, tagsNo)
  indexes_include = [i for i in range(len(df))]
  if iced or hot:
    indexes_include = icedHot(indexes_include, sm_df, iced, hot)
  if spirit != 'nopref':
    indexes_include = base_spirit(indexes_include, spirit)
  if season != 'nopref':
    indexes_include = season_filter(indexes_include, season)
  if easy:
    indexes_include = easy_filter(indexes_include)
  if len(tagsNo):
    indexes_include = tagNo_filter(indexes_include, sm_df, tagsNo)
  if len(tagsYes):
    indexes_include = tagYes_filter(indexes_include, sm_df, tagsYes)

  # set_temp = set(indexes_temp)
  # set_spirit = set(indexes_spirit)
  # set_season = set(indexes_season)

  # if len(indexes_temp):
  #   indexes_include = set_temp
  #   if len(indexes_spirit):
  #     indexes_include = indexes_include.intersection(set_spirit)
  #     if len(indexes_season):
  #       indexes_include = indexes_include.intersection(set_season)
  #   elif len(indexes_season):
  #     indexes_include = indexes_include.intersection(set_season)

  # elif len(indexes_season):
  #   indexes_include = set_season
  #   if len(indexes_spirit):
  #     indexes_include = indexes_include.intersection(set_spirit)
  #     if len(indexes_temp):
  #       indexes_include = indexes_include.intersection(set_temp)
  #   elif len(indexes_temp):
  #     indexes_include = indexes_include.intersection(set_temp)

  # elif len(indexes_spirit):
  #   indexes_include = indexes_spirit
  #   if len(indexes_temp):
  #     indexes_include = indexes_include.intersection(set_temp)
  #     if len(indexes_season):
  #       indexes_include = indexes_include.instersection(set_season)
  #   elif len(indexes_season):
  #     indexes_include = indexes_include.instersection(set_season)
  # else:
  #   indexes_include = [i for i in range(len(sm_df))]

  # indexes_include = list(indexes_include)

  if query:
    return jaccard(query, tokenized_df.copy(),sim_feature_weights, indexes_include)
  else: # pass: return column for ratings to get top 10
    print("no query")
    filtered_df = df.iloc[indexes_include, :]
    print(filtered_df)
    return filtered_df['rating']
    
    