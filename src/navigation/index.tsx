import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    HomeScreen: undefined;
    DetailsScreen: { category: string };
};

export type NavigationProp<
  RouteName extends keyof RootStackParamList = RootStackScreens,
> = NativeStackNavigationProp<RootStackParamList, RouteName>;

export type RootStackScreens = keyof RootStackParamList;

export type StackNavigationProp<
  R extends keyof RootStackParamList = RootStackScreens,
> = NavigationProp<R>;

export type NativeStackScreenProp<
  RouteName extends keyof RootStackParamList = RootStackScreens,
> = NativeStackScreenProps<RootStackParamList, RouteName>;