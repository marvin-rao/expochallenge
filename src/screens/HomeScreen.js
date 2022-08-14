import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { API } from "../axios";

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadJokes = useCallback(async () => {
    setLoading(true);
    try {
      const result = await API.get(`/jokes/categories`);
      if (result.status === 200) {
        setCategories(result.data);
      }
    } catch (e) {
      console.log("loadJokesError", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJokes();
  }, [loadJokes]);

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Details", { category: item })} style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {loading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading Categories</Text>
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          <Text style={styles.title}>Chuck Norris Jokes</Text>
          <FlatList style={styles.flatlist} data={categories} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    padding: 20,
    fontSize: 20,
  },
  item: {
    flex: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 10,
    paddingVertical: 20,
  },
  flatlist: {
    flex: 1,
    paddingBottom: 50,
  },
  itemText: {
    textTransform: "capitalize",
    paddingHorizontal: 14,
  },
  loading: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
  },
});

export default HomeScreen;
