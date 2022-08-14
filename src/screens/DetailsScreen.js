import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { API } from "../axios";
import moment from "moment";

const DetailsScreen = ({ route }) => {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(false);
  const { category } = route.params;

  const loadJoke = useCallback(async () => {
    setLoading(true);
    try {
      const result = await API.get(`/jokes/random?category=${category}`);
      if (result.status === 200) {
        setJoke(result.data);
      }
    } catch (e) {
      console.log("loadJokeError", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJoke();
  }, [loadJoke]);

  const { value, created_at } = joke;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading && (
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading Joke</Text>
        </View>
      )}

      {!loading && (
        <View style={styles.container}>
          <Text style={styles.title}>Chuck Norris Jokes</Text>
          <View style={styles.card}>
            <Text style={styles.joke}>{value}</Text>
            <Text style={styles.categories}>Categories</Text>
            {joke?.categories?.map((c) => {
              return (
                <Text key={c} style={styles.category}>
                  {c + " "}
                </Text>
              );
            })}
            <View style={styles.footer}>
              <Text style={styles.created}>{moment(created_at).fromNow()}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  loadingText: {
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
  },
  categories: {
    marginTop: 10,
    fontSize: 14,
    textTransform: "capitalize",
    color: "rgba(0, 0, 0, 0.8)",
  },
  joke: {
    fontSize: 16,
  },
  category: {
    textTransform: "capitalize",
    color: "rgba(0, 0, 0, 0.6)",
  },
  created: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 20,
  },
  footer: {
    marginTop: 20,
  },
});

export default DetailsScreen;
