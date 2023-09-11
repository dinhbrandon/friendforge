import pandas as pd
import nltk
import spacy
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer

nltk.download('stopwords')
nlp = spacy.load("en_core_web_sm")

def preprocess_text(text):
    """
    Preprocess a given text: lowercase conversion, tokenization, stopwords and non-alphabetic removal.
    
    Args:
    - text (str): Input text string to be processed.
    
    Returns:
    - str: Cleaned and processed text string.
    """
    text = text.lower()
    
    # Tokenization using SpaCy
    doc = nlp(text)
    
    # Remove stopwords and non-alphabetic tokens
    tokens = [token.text for token in doc if not token.is_stop and token.is_alpha]
    
    # Join the tokens back into a single string
    return ' '.join(tokens)

def main():
    # Load training data from the 'data' directory
    data_train = pd.read_csv("./data/training_data_v1.csv")
    chats_train = data_train["Chat"]
    
    # Preprocess training data
    chats_train_clean = chats_train.apply(preprocess_text)
    
    # Save the cleaned chat data to the 'data' directory
    data_train["Cleaned_Chat"] = chats_train_clean
    data_train.to_csv("./data/training_data_v1_cleaned.csv", index=False)

    # TF-IDF Vectorization for training data
    vectorizer = TfidfVectorizer()
    X_train = vectorizer.fit_transform(chats_train_clean)
    
    # Saving the TF-IDF vectorized data in the 'data' directory
    df_vectorized = pd.DataFrame(X_train.toarray(), columns=vectorizer.get_feature_names_out())
    df_vectorized.to_csv("./data/training_data_v1_vectorized.csv", index=False)
    
    # For test data preprocessing:
    # data_test = pd.read_csv("../data/test_data_v1.csv")  
    # chats_test = data_test["Chat"]
    # chats_test_clean = chats_test.apply(preprocess_text)
    # X_test = vectorizer.transform(chats_test_clean)
    # And similarly, you'd save the cleaned and vectorized test data.


if __name__ == "__main__":
    main()
