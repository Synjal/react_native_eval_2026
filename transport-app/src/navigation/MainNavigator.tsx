import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import JourneyScreen from '../screens/journeys/JourneyScreen';
import StopsScreen from '../screens/stops/StopsScreen';
import VehiclesScreen from '../screens/vehicles/VehiclesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trajets" component={JourneyScreen} />
      <Tab.Screen name="Arrêts" component={StopsScreen} />
      <Tab.Screen name="Véhicules" component={VehiclesScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}