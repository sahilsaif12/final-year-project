import json
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis



def lda(data):
    df = pd.read_excel(data)
    X =df.iloc[:, :-1].values
    y = df.iloc[:, -1].values

    target_names =[10,20,30,40,50]
    sc = StandardScaler()
    X = sc.fit_transform(X)

    le = LabelEncoder()
    y = le.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    lda = LinearDiscriminantAnalysis(n_components=2)
    X_train_lda = lda.fit_transform(X_train, y_train)
    X_test_lda = lda.transform(X_test)

    colors = ['red', 'green', 'blue','orange','purple']
    markers = ['o', 'o', 'o','o','o']
    for color, marker, i, target_name in zip(colors, markers, [0, 1, 2,3,4], target_names):
        plt.scatter(X_train_lda[y_train == i, 0], X_train_lda[y_train == i, 1],
                    c=color, alpha=0.7, label=target_name, marker=marker, edgecolors='k')
    
    # unique_labels = np.unique(y)
    # for i in unique_labels:
    #     plt.scatter(X_train_lda[y_train == i, 0], X_train_lda[y_train == i, 1],
    #                 label=f'{i+1}0', s=50, c='viridis')
    
    plt.title('LDA classification')

    plt.legend(loc='best', shadow=False, scatterpoints=1)

    plt.savefig('public/temp/lda.png')
    
    df_lda = pd.DataFrame(X_train, columns=[f'LD{i+1}' for i in range(X_train.shape[1])])
    df_lda['class'] = y_train
    centroids = df_lda.groupby('class').mean().values

    distances = np.linalg.norm(centroids[:, np.newaxis] - centroids, axis=2)
    distances_df = pd.DataFrame(distances, index=[10,20,30,40,50], columns=[10,20,30,40,50])

    separability_index = np.mean(distances[np.triu_indices_from(distances, k=1)])
    print(f"{separability_index:.2f}")





if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    lda(data)
 