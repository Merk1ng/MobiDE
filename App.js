import {createDrawerNavigator} from '@react-navigation/drawer';
import {LoginScreen} from './screens/common/LoginScreen';
import * as firebase from '@react-native-firebase/app';
import Splash from './screens/common/Splash';
import {Home} from './screens/Home';
import {Main} from './screens/3_retail/Main';
import LogOutButton from './components/LogOutButton';
import ServiceDetails from './screens/1_service_wholesale/ServiceDetails';
import Downloading from './screens/common/Downloading';
import Uploading from './screens/common/Uploading';
import SurveyDetails from './screens/2_wholesale/SurveyDetails';
import Reports from './screens/1_service_wholesale/Reports';
import InternalOrdersList from './screens/3_retail/InternalOrdersList';
import {ExternalOrdersList} from './screens/3_retail/ExternalOrdersList';
import {PurchasesList} from './screens/3_retail/PurchasesList';
import {PurchasesPTU} from './screens/3_retail/PurchasesPTU';
import {PurchaseDetailsPTU} from './screens/3_retail/PurchaseDetailsPTU';
import {PurchaseDetails} from './screens/3_retail/PurchaseDetails';
import {InventoryList} from './screens/3_retail/InventoryList';
import {InventoryDetails} from './screens/3_retail/InventoryDetails';
import {InternalOrderDetails} from './screens/3_retail/InternalOrderDetails';
import {ExternalOrderDetails} from './screens/3_retail/ExternalOrderDetails';
import Settings from './screens/common/Settings';
import {PriceTags} from './screens/PriceTags';
import {RetailTechnicDetails} from './screens/4_service_retail/RetailTechnicDetails';
import FoodServiceOrderDetails from './screens/5_foodservice/FoodServiceOrderDetails';
import FoodServiceOrdersList from './screens/5_foodservice/FoodServiceOrdersList';
import {FranchOrderDetails} from './screens/6_franchise/FranchOrderDetails';
import News from './screens/6_franchise/News';
import {Calculations} from './screens/6_franchise/Calculations';
import {Education} from './screens/6_franchise/Education';
import {Tsd} from './screens/6_franchise/Tsd';
import SurveyList from './screens/2_wholesale/SurveyList';
import ServiceList from './screens/1_service_wholesale/ServiceList';
import TaskList from './screens/common/Task/TaskList';
import RetailTechnicList from './screens/4_service_retail/RetailTechnicList';

const firebaseConfig = {
  apiKey: 'AIzaSyAw4cCY1vcc8Kq_PJ3PGxyd20i2H1P4SLQ',
  authDomain: 'pivko-group.firebaseapp.com',
  databaseURL: 'https://pivko-group.firebaseio.com',
  projectId: 'pivko-group',
  storageBucket: 'pivko-group.appspot.com',
  messagingSenderId: '906071345304',
  appId: '1:906071345304:web:39a629f5cd7eb6eb01e8ed',
  measurementId: 'G-1Y22T80RR5',
};
console.disableYellowBox = true;
firebase.initializeApp(firebaseConfig);

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const FoodServiceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="FoodServiceOrderDetails"
        component={FoodServiceOrderDetails}
      />
      <Stack.Screen
        name="FoodServiceOrdersList"
        component={FoodServiceOrdersList}
      />
      <Stack.Screen name="Uploading" component={FoodServiceOrdersList} />
      <Stack.Screen name="Downloading" component={Downloading} />
      <Stack.Screen name="LogOutButton" component={LogOutButton} />
    </Stack.Navigator>
  );
};

const TechnicStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServiceList" component={ServiceList} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="Uploading" component={FoodServiceOrdersList} />
      <Stack.Screen name="Downloading" component={Downloading} />
      <Stack.Screen name="LogOutButton" component={LogOutButton} />
    </Stack.Navigator>
  );
};

const RetailTechnicStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="RetailTechnicList" component={RetailTechnicList} />
      <Stack.Screen
        name="RetailTechnicDetails"
        component={RetailTechnicDetails}
      />
      <Stack.Screen name="Downloading" component={Downloading} />
      <Stack.Screen name="LogOutButton" component={LogOutButton} />
    </Stack.Navigator>
  );
};

const AuthorizationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const FranchiseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Calculations" component={Calculations} />
      <Stack.Screen name="Tsd" component={Tsd} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="Education" component={Education} />
      <Stack.Screen name="Downloading" component={Downloading} />
      <Stack.Screen name="LogOutButton" component={LogOutButton} />
      <Stack.Screen name="FranchOrderDetails" component={FranchOrderDetails} />
    </Stack.Navigator>
  );
};

const WholesaleStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SurveyList" component={SurveyList} />
      <Stack.Screen name="SurveyDetails" component={SurveyDetails} />
      <Stack.Screen name="Uploading" component={Uploading} />
      <Stack.Screen name="Downloading" component={Downloading} />
      <Stack.Screen name="LogOutButton" component={LogOutButton} />
    </Stack.Navigator>
  );
};

const RetailStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="InternalOrdersList" component={InternalOrdersList} />
      <Stack.Screen
        name="InternalOrderDetails"
        component={InternalOrderDetails}
      />
      <Stack.Screen
        name="InternalOrderDetails"
        component={InternalOrderDetails}
      />
      <Stack.Screen name="ExternalOrdersList" component={ExternalOrdersList} />
      <Stack.Screen
        name="ExternalOrderDetails"
        component={ExternalOrderDetails}
      />
      <Stack.Screen name="PurchasesPTU" component={PurchasesPTU} />
      <Stack.Screen name="PurchaseDetailsPTU" component={PurchaseDetailsPTU} />
      <Stack.Screen name="PurchasesList" component={PurchasesList} />
      <Stack.Screen name="InventoryList" component={InventoryList} />
      <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
      <Stack.Screen name="InventoryDetails" component={InventoryDetails} />
      <Stack.Screen name="PriceTags" component={PriceTags} />
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="Downloading" component={Downloading} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="LogOutButton" component={LogOutButton} />
    </Stack.Navigator>
  );
};

export const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen name="WholesaleStack" component={WholesaleStack} />

        <Drawer.Screen name="RetailStack" component={RetailStack} />

        <Drawer.Screen name="FoodServiceStack" component={FoodServiceStack} />

        <Drawer.Screen name="TechnicStack" component={TechnicStack} />
        <Drawer.Screen
          name="RetailTechnicStack"
          component={RetailTechnicStack}
        />
        <Drawer.Screen
          name="AuthorizationStack"
          component={AuthorizationStack}
        />
        <Drawer.Screen name="FranchiseStack" component={FranchiseStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
