import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { SIZES } from "../../../constants";

import SearchButton from "./SearchButton";

const genres = ['Personal Growth', 'Leadership/Management', 'Creativity', 'Finance/Wealth', 'Communication/Relationships',
'Health/Wellness', 'Mindfulness', 'Spirituality'];

const Welcome = ({ handleSearchClick, cat, gen, name}) => {
  const router = useRouter();
  const [genre, setGenre] = useState("Personal Growth");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {name}</Text>
        <Text style={styles.welcomeMessage}>Find your perfect book</Text>
      </View>

      <SearchButton 
          onPress={handleSearchClick}
      />

      <View style={styles.tabsContainer}>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(genre, item)}
              onPress={() => {
                setGenre(item);
                router.push({
                  pathname: `(drawer)/home/all/${item.replace(/\//g, " ")}`,
                  params: {cat: cat, gen: gen}
                });
              }}
            >
              <Text style={styles.tabText(genre, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
