import { Dimensions, StyleSheet } from "react-native";
export const { width, height } = Dimensions.get("window");

export const ITEM_SIZE = width * 0.72;
export const SPACING = 5;

export const styles = StyleSheet.create({
  movieContainer: {
    width: ITEM_SIZE,
  },
  movieInner: {
    alignItems: "center",
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    backgroundColor: "transparent",
    borderRadius: 34,
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  spacerContainer: {
    height: 200,
    width: (width - ITEM_SIZE) / 2,
  },
})