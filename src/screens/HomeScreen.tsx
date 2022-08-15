import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { API } from "../axios";
import JokeCard from "../components/JokeCard";
import SearchInput from "../components/SearchInput";
import {NativeStackScreenProp} from '../navigation';

interface HomeScreenProps extends NativeStackScreenProp<'HomeScreen'> {}

const HomeScreen:React.FC<HomeScreenProps> = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

  const searchJokes = useCallback(async (query) => {
    try {
      const result = await API.get(`/jokes/search?query=${query}`);
      if (result.status === 200) {
        setSearchResults(result.data.result);
      }
    } catch (e) {
      console.log("loadJokesError", e);
    }
  }, []);

  useEffect(() => {
    loadJokes();
  }, [loadJokes]);

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => {
        navigation.navigate("DetailsScreen", { category: item });
      }} style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </Pressable>
    );
  };

  const renderJoke = ({ item }) => {
    return <JokeCard data={item} />;
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
          <View style={styles.smallBanner}>
            <Text style={styles.title}>Chuck Norris Jokes</Text>
            <SearchInput
              onClear={() => {
                setSearchResults([]);
              }}
              onSearch={(v) => searchJokes(v)}
            />
          </View>
          {searchResults.length > 0 && (
            <FlatList
              ListHeaderComponent={() => {
                return <Text style={{ paddingVertical: 6 }}>Search Results</Text>;
              }}
              style={styles.searchflatlist}
              data={searchResults}
              renderItem={renderJoke}
              keyboardDismissMode="on-drag"
            />
          )}
          {searchResults.length === 0 && <FlatList style={styles.flatlist} data={categories} renderItem={renderItem} />}
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
    paddingHorizontal: 20,
    fontSize: 20,
    paddingBottom: 10,
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
  searchflatlist: {
    flex: 1,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  itemText: {
    textTransform: "capitalize",
    paddingHorizontal: 14,
    fontSize: 18,
  },
  loading: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
  },
  search: {
    paddingVertical: 4,
    marginHorizontal: 12,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  smallBanner: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
});

export default HomeScreen;
