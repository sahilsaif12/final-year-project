import json
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.cross_decomposition import PLSRegression



def plsr(data,ref):
    df = pd.read_excel(data)
    X =df.iloc[:, :-1].values
    y = df.iloc[:, -1].values


    def rmse(y_true, y_pred):
        return np.sqrt(mean_squared_error(y_true, y_pred))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    n_components = 2  # Number of components to keep
    pls = PLSRegression(n_components=n_components)
    pls.fit(X_train_scaled, y_train)
    # print(y_train)
    y_train_pred_plsr = pls.predict(X_train_scaled)

    y_test_pred_plsr = pls.predict(X_test_scaled)

    X_scaled = np.vstack((X_train_scaled, X_test_scaled))
    y_combined = np.concatenate((y_train, y_test))
    y_combined_pred_plsr = pls.predict(X_scaled)

    rmsec_plsr = rmse(y_train, y_train_pred_plsr)
    r2c_plsr = r2_score(y_train, y_train_pred_plsr)

    rmsev_plsr = rmse(y_test, y_test_pred_plsr)
    r2v_plsr = r2_score(y_test, y_test_pred_plsr)

    rmsep_plsr = rmse(y_combined, y_combined_pred_plsr)
    r2p_plsr = r2_score(y_combined, y_combined_pred_plsr)



    #*imp
    # yt=[19.38, 10.29, 40, 14.90, 10, 10, 50, 50, 50, 20, 10, 20 ,30, 40, 40 ,10, 50, 30, 40 ,10, 30, 20, 40, 10,
    # 30, 10, 50, 40, 30 ,50, 20, 30 ,20 ,50 ,30, 10, 50, 20, 30, 40,20 ,40 ,40, 50, 20, 50, 30, 30,40 ,20]
    # pls.fit(X_scaled, yt)
    # print(yt)
    #  Make predictions on the training set
    # yt_plsr = pls.predict(X_scaled)
    # print(yt_plsr)
    array = np.array( y_combined )
 
    # Find the index of the closest value
    closest_index = (np.abs(array - ref)).argmin()
    array[closest_index]=ref

    pls.fit(X_scaled, array)
    yt_plsr = pls.predict(X_scaled)

    accuracy=0
    predicted=yt_plsr[closest_index]
    if(ref>predicted):
        accuracy=(predicted/ref)*100
    else:
        accuracy=(ref/predicted)*100


    print(f"{rmsec_plsr:.4f} {rmsev_plsr:.4f} {rmsep_plsr:.4f} {r2c_plsr:.4f} {r2v_plsr:.4f} {r2p_plsr:.4f} {predicted:.2f} {accuracy:.2f}")


    # Plotting the results
    plt.figure(figsize=(10, 5))

    # Calibration plot
    plt.scatter(y_train, y_train_pred_plsr, color='orange', alpha=0.6, edgecolors='k', label='Predicted')
    plt.scatter(y_train, y_train, color='green', alpha=0.6, edgecolors='k', label='Actual')
    plt.plot([y_train.min(), y_train.max()], [y_train.min(), y_train.max()], 'k--', lw=3)
    plt.xlabel('Measured')
    plt.ylabel('Predicted')
    plt.title('Calibration (training set)')
    legend_labels = ['Predicted', 'Actual']
    plt.legend(labels=legend_labels)
    # plt.show()
    plt.savefig('public/temp/plsr_training.png')

    # Validation plot
    # plt.scatter(y_combined, y_combined_pred_plsr, alpha=0.3, color='r')
    plt.scatter(y_test, y_test_pred_plsr, color='yellow', alpha=0.6, edgecolors='k', label='Predicted')
    plt.scatter(y_test, y_test, color='green', alpha=0.6, edgecolors='k', label='Actual')
    plt.plot([y_combined.min(), y_combined.max()], [y_combined.min(), y_combined.max()], 'k--', lw=3)
    plt.xlabel('Measured')
    plt.ylabel('Predicted')
    plt.title('Validation (testing set)')
    legend_labels = ['Predicted', 'Actual']
    plt.legend(labels=legend_labels)

    plt.savefig('public/temp/plsr_testing.png')
    # plt.tight_layout()
    # plt.show()

    


if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    ref=float(sys.argv[2])

    plsr(data,ref)
 