#name: clusterwinedata
#description: Cluster fetched data
#language: python
#input: dataframe df_wine
#output: dataframe df_plot

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns

# --- Step 1: Preprocessing ---
features = df_wine.drop(labels=["quality", "wine_type"], axis=1)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(features)

# --- Step 2: PCA for visualization ---
pca = PCA(n_components=4)
X_pca = pca.fit_transform(X_scaled)

# --- Step 3: K-means clustering ---
kmeans = KMeans(n_clusters=5, random_state=42)
clusters = kmeans.fit_predict(X_scaled)

# --- Step 4: Plotting ---
df_plot = pd.DataFrame({
    "PCA1": X_pca[:, 0],
    "PCA2": X_pca[:, 1],
    "cluster": clusters,
    "wine_type": df_wine["wine_type"]
})

#plt.figure(0, figsize=(10, 6))
#sns.scatterplot(data=df_plot, x="PCA1", y="PCA2", hue="cluster", style="wine_type", palette="Set2", s=60)
#plt.title("Wine Dataset - KMeans Clusters (via PCA)")
#plt.xlabel("PC 1")
#plt.ylabel("PC 2")
#plt.legend(title="Cluster / Wine Type")
#plt.tight_layout()
# plt.show() # Not needed because we return graphics to Datagrok
