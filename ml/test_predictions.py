import pandas as pd
import joblib
import os

LDA_MODEL_PATH = os.path.join("models", "lda_model.pkl")
VECTORIZER_PATH = os.path.join("models", "vectorizer.pkl")
MAPPING_PATH = os.path.join("models", "topic_interest_mapping.pkl")

lda_model = joblib.load(LDA_MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)
topic_to_interest_mapping = joblib.load(MAPPING_PATH)

def predict_interest(chat):
    # Vectorize the chat text
    chat_vectorized = vectorizer.transform([chat])
    
    # Get topic distribution
    topic_distribution = lda_model.transform(chat_vectorized)
    
    # Identify dominant topic
    dominant_topic = topic_distribution[0].argmax()
    
    # Map to interest
    return topic_to_interest_mapping.get(dominant_topic, "Unknown Interest")

def main():
    test_data = pd.read_csv("./data/test_data_v1.csv")
    correct_predictions = 0

    for index, row in test_data.iterrows():
        predicted_interest = predict_interest(row['Chat'])
        print(f"Chat: {row['Chat']}")
        print(f"Predicted Interest: {predicted_interest}")
        print(f"Actual Interest: {row['Topic']}")
        print("-" * 50)

        if predicted_interest == row['Topic']:
            correct_predictions += 1

    accuracy = (correct_predictions / len(test_data)) * 100
    print(f"Accuracy: {accuracy:.2f}%")

if __name__ == "__main__":
    main()
