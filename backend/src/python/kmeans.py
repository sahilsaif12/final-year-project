import json
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.cluster import KMeans



def kmeans(data):
    df = pd.read_excel(data)
    X =df.iloc[:, :-1].values
    y = df.iloc[:, -1].values

    X_train, X_test,y_train, y_test = train_test_split(X, y, test_size=0.2)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    kmeans = KMeans(n_clusters=5, random_state=0)
    kmeans.fit(X_scaled)

    labels = kmeans.labels_
    centers = kmeans.cluster_centers_

    unique_labels = np.unique(labels)
    for i in unique_labels:
        plt.scatter(X_scaled[labels == i, 0], X_scaled[labels == i, 1],
                    label=f'{i+1}0', s=50)

    plt.scatter(centers[:, 0], centers[:, 1], c='red', s=200, alpha=0.75, marker='X', label='Centroid')

    plt.title('K-means')
    # plt.xlabel('Feature 1')
    # plt.ylabel('Feature 2')

    plt.legend()

    # plt.show()

    # from sklearn.metrics import silhouette_score
    # silhouette_avg = silhouette_score(X_scaled, labels)
    # print(f'Silhouette Score: {silhouette_avg:.3f}')

    plt.savefig('public/temp/kmeans.png')


    df_ = pd.DataFrame(X_train, columns=[f'LD{i+1}' for i in range(X_train.shape[1])])
    df_['class'] = y_train
    centroids = df_.groupby('class').mean().values
    distances = np.linalg.norm(centroids[:, np.newaxis] - centroids, axis=2)
    distances_df = pd.DataFrame(distances, index=[10,20,30,40,50], columns=[10,20,30,40,50])
    separability_index = np.mean(distances[np.triu_indices_from(distances, k=1)])
    print(f"{separability_index:.2f}")





if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    kmeans(data)
 