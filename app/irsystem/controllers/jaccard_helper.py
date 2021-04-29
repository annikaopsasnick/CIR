import pandas as pd
import os
import numpy as np
import nltk
import re
from nltk.tokenize import TreebankWordTokenizer
from nltk.corpus import stopwords
from autocorrect import Speller

spell = Speller(lang='en')

# download stop words 
nltk.download('stopwords')

# load in the data
data_file = os.path.join(os.path.dirname(__file__), "dataset.csv")

df = pd.read_csv(data_file)
sim_feature_weights = {"base_spirits":0.25, "name":0.4, "description":0.1, "ingredients":0.25} # {"feature_col": "weight"}


# split words on characters
word_splitter = re.compile(r"""
    ([a-zA-Z]+)
    """, re.VERBOSE)

def getwords(sent):
    return [w.lower() for w in word_splitter.findall(sent)]

def clean_data(raw_df):
    """
    Return a dataFrame of length num_cocktails where values are tokenized features and stop words are removed 
    
    Params: {raw_df: Pandas df}
    Returns: Pandas df
    """
    
    tokenized_df = pd.DataFrame()
    for feature in sim_feature_weights.keys():
        sm_df = raw_df[feature].map(str)
       
        for idx,vector_sen in enumerate(sm_df):
            tokenized_vector = getwords(vector_sen) # removes punctuation and numbers
            #     remove stop words 
            sm_df[idx] = [w for w in tokenized_vector if not w in stopwords.words('english')]
        tokenized_df[feature] = sm_df
    return tokenized_df

 # tokenize, lowercase, and remove punctuation, autocorrect from input_query 
def clean_query(input_query, tokenizer):
    input_query = str(input_query)
    tok_list = tokenizer.tokenize(input_query)
    autocorrect_toks = [spell(q.lower()) for q in tok_list if q.isalpha()]
    print(autocorrect_toks)
    return autocorrect_toks
    

# global variables accessible to jaccard.py
# input_df = df
tokenized_df = clean_data(df)
n_cocktails, n_cols = tokenized_df.shape
sm_df = tokenized_df.copy()
sm_df['combined'] = sm_df['base_spirits']+ sm_df['name'] + sm_df['description'] + sm_df['ingredients']
sm_df = sm_df['combined']



