import json
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score



def pcr(data,ref):
    df = pd.read_excel(data)
    X =df.iloc[:, :-1].values
    y = df.iloc[:, -1].values


    def rmse(y_true, y_pred):
        return np.sqrt(mean_squared_error(y_true, y_pred))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    X_scaled = scaler.transform(X)

    # Apply PCA
    n_components = 2  
    pca = PCA(n_components=n_components)
    X_train_pca = pca.fit_transform(X_train_scaled)
    X_test_pca = pca.transform(X_test_scaled)
    # X_pca = pca.transform(X_scaled)

    # Apply Linear Regression on PCA-transformed data
    lr = LinearRegression()
    lr.fit(X_train_pca, y_train)

    # Validate the PCR model using cross-validation
    # y_train_pred_pcr = cross_val_predict(lr, X_train_pca, y_train, cv=10)
    y_train_pred_pcr = lr.predict(X_train_pca)

    # Make predictions on the test set
    y_test_pred_pcr = lr.predict(X_test_pca)

    X_scaled = np.vstack((X_train_scaled, X_test_scaled))
    y_combined = np.concatenate((y_train, y_test))
    X_pca_combined = pca.transform(X_scaled)
    y_combined_pred_pcr = lr.predict(X_pca_combined)

    rmsec_pcr = rmse(y_train, y_train_pred_pcr)
    r2c_pcr = r2_score(y_train, y_train_pred_pcr)
    rmsev_pcr = rmse(y_test, y_test_pred_pcr)
    r2v_pcr = r2_score(y_test, y_test_pred_pcr)
    rmsep_pcr = rmse(y_combined, y_combined_pred_pcr)
    r2p_pcr = r2_score(y_combined, y_combined_pred_pcr)

    array = np.array( y_combined )
 
    # Find the index of the closest value
    closest_index = (np.abs(array - ref)).argmin()
    array[closest_index]=ref

    lr.fit(X_scaled, array)
    yt_pcr = lr.predict(X_scaled)

    accuracy=0
    predicted=yt_pcr[closest_index]
    if(ref>predicted):
        accuracy=(predicted/ref)*100
    else:
        accuracy=(ref/predicted)*100


    print(f"{rmsec_pcr:.4f} {rmsev_pcr:.4f} {rmsep_pcr:.4f} {r2c_pcr:.4f} {r2v_pcr:.4f} {r2p_pcr:.4f} {predicted:.2f} {accuracy:.2f}")

    # Plotting the results
    plt.figure(figsize=(10, 5))

    # Calibration plot
    # plt.subplot(1, 2, 1)
    # plt.scatter(y_train, y_train_pred_pcr, alpha=0.3)
    plt.scatter(y_train, y_train_pred_pcr, color='orange', alpha=0.6, edgecolors='k', label='Predicted')
    plt.scatter(y_train, y_train, color='green', alpha=0.6, edgecolors='k', label='Actual')

    plt.plot([y_train.min(), y_train.max()], [y_train.min(), y_train.max()], 'k--', lw=3)

    plt.xlabel('Measured')
    plt.ylabel('Predicted')
    plt.title('PCR Calibration (training set)')
    legend_labels = ['Predicted', 'Actual']
    plt.legend(labels=legend_labels)
    plt.savefig('public/temp/pcr_training.png')
    # plt.show()
    # print("\n")


    # Validation plot
    # plt.subplot(1, 2, 2)
    # plt.scatter(y_test, y_test_pred_pcr, alpha=0.3, color='r')
    plt.scatter(y_test, y_test_pred_pcr, color='yellow', alpha=0.6, edgecolors='k', label='Predicted')
    plt.scatter(y_test, y_test, color='green', alpha=0.6, edgecolors='k', label='Actual')
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=3)
    plt.xlabel('Measured')
    plt.ylabel('Predicted')
    plt.title('PCR Validation (testing set)')
    legend_labels = ['Predicted', 'Actual']
    plt.legend(labels=legend_labels)
    plt.savefig('public/temp/pcr_testing.png')

    plt.tight_layout()
    # plt.show()


    


if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    ref=float(sys.argv[2])
    pcr(data,ref)
 