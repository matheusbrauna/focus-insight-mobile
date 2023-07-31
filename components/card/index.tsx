import { Animated, View } from "react-native";
import React, { useRef } from "react";
import { ITEM_SIZE, styles } from "./styles";
import { images } from "../../constants";
import { Image } from "expo-image";

const Card = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const movieImages = [
    { key: "left-spacer" },
    ...images,
    { key: "right-spacer" },
  ];

  return (
    <Animated.FlatList
      horizontal
      data={movieImages}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_SIZE}
      bounces={false}
      scrollEventThrottle={16}
      contentContainerStyle={{ alignItems: "center" }}
      keyExtractor={(_: any, index: number) => `${index}`}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      renderItem={({ item, index }) => {
        if (index === 0 || index === movieImages.length - 1) {
          return <View style={styles.spacerContainer} />;
        }
        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [70, -30, 70],
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.movieContainer,
              {
                transform: [{ translateY }],
                opacity,
              },
            ]}
          >
            <View style={[styles.movieInner]}>
              <Image source={item.toString()} style={styles.posterImage} />
            </View>
          </Animated.View>
        );
      }}
    />
  );
};

export default Card;