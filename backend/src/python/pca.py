import json
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from matplotlib.colors import ListedColormap



def pca(data):
    df = pd.read_excel(data)
    X =df.iloc[:, :-1].values
    y = df.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    pca = PCA()
    X_train = pca.fit_transform(X_train)
    X_test = pca.transform(X_test)

    explained_variance = pca.explained_variance_ratio_
    # print("pca1 contribution: ",explained_variance[0]*100)
    # print("pca2 contribution: ",explained_variance[1]*100)
    # print("pca2 contribution: ",explained_variance*100)
    # print(sum(explained_variance))

    classifier = LogisticRegression(random_state = 0,penalty="l2")
    classifier.fit(X_train, y_train)
    y_pred = classifier.predict(X_test)


    cm = confusion_matrix(y_test, y_pred)

    X_set, y_set = X_train, y_train
    X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1,
                        stop = X_set[:, 0].max() + 1, step = 0.01),
                        np.arange(start = X_set[:, 1].min() - 1,
                        stop = X_set[:, 1].max() + 1, step = 0.01))

    plt.xlim(X1.min(), X1.max())
    plt.ylim(X2.min(), X2.max())

    for i, j in enumerate(np.unique(y_set)):
        plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                    color = ListedColormap(('red', 'green', 'blue','orange','indigo'))(i), label = j)

    plt.title('Logistic Regression (Training set)')
    plt.xlabel(f'PCA 1 ({explained_variance[0]*100:.2f}%)') # for Xlabel
    plt.ylabel(f'PCA 2 ({explained_variance[1]*100:.2f}%)') # for Ylabel
    plt.legend() 

    # plt.show()
    plt.savefig('public/temp/pca.png')
    # print(df)

    
    # Compute class centroids in the PCA space
    df_pca = pd.DataFrame(X_train, columns=[f'PC{i+1}' for i in range(X_train.shape[1])])
    df_pca['class'] = y_train
    centroids = df_pca.groupby('class').mean().values
    distances = np.linalg.norm(centroids[:, np.newaxis] - centroids, axis=2)
    distances_df = pd.DataFrame(distances, index=[10,20,30,40,50], columns=[10,20,30,40,50])
    # print(distances_df)
    separability_index = np.mean(distances[np.triu_indices_from(distances, k=1)])
    print(f"{separability_index:.2f}")





if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    pca(data)
 