import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface JokeCardProps {
  data?:any
}

const JokeCard:React.FC<JokeCardProps> = ({ data }) => {
  const { value, created_at, categories } = data;
  return (
    <View style={styles.card}>
      <Text style={styles.joke}>{value}</Text>
      <Text style={styles.categories}>Categories</Text>
      {categories?.map((c) => {
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
  );
};

const styles = StyleSheet.create({
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

export default JokeCard;
