import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StopsStackParamList } from "../types/Stops";

import JourneyScreen from '../screens/journeys/JourneyScreen';
import StopsScreen from '../screens/stops/StopsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import StopDetailScreen from "../screens/stops/StopDetailScreen";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StopsStackParamList>();

function StopsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Liste des arrêts" component={StopsScreen} />
      <Stack.Screen name="Details" component={StopDetailScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
          name="Trajets"
          component={JourneyScreen}
          options={{
              tabBarIcon: ({color, size}) =>
                  <Ionicons name="swap-horizontal" size={size} color={color}/>
          }}
      />
      <Tab.Screen
          name="Arrêts"
          component={StopsStack}
          options={{
              tabBarIcon: ({color, size}) =>
                  <Ionicons name="locate-outline" size={size} color={color}/>
          }}
      />
      <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
              tabBarIcon: ({color, size}) =>
                  <Ionicons name="person" size={size} color={color}/>
          }}
      />
    </Tab.Navigator>
  );
}