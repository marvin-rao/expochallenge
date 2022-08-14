import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { API } from "../axios";

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
      console.log("loadJokesError", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJoke();
  }, [loadJoke]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {loading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading Joke</Text>
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          <Text style={styles.title}>Chuck Norris Jokes</Text>
          <Text style={styles.joke}>{joke.value}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsScreen;
