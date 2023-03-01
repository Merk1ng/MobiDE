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

import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GlobalContext, GlobalProvider} from './context';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const FoodServiceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
    </Stack.Navigator>
  );
};

const TechnicStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ServiceList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServiceList" component={ServiceList} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="Reports" component={Reports} />
    </Stack.Navigator>
  );
};

const RetailTechnicStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="RetailTechnicList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="RetailTechnicList" component={RetailTechnicList} />
      <Stack.Screen
        name="RetailTechnicDetails"
        component={RetailTechnicDetails}
      />
    </Stack.Navigator>
  );
};

const FranchiseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Calculations"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Calculations" component={Calculations} />
      <Stack.Screen name="Tsd" component={Tsd} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="Education" component={Education} />
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
      <Stack.Screen name="DetailsScreen" component={SurveyDetails} />
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
      <Stack.Screen name="ExternalOrdersList" component={ExternalOrdersList} />
      <Stack.Screen name="PurchasesPTU" component={PurchasesPTU} />
      <Stack.Screen name="PurchaseDetailsPTU" component={PurchaseDetailsPTU} />
      <Stack.Screen name="PurchasesList" component={PurchasesList} />
      <Stack.Screen name="InventoryList" component={InventoryList} />
      <Stack.Screen name="InventoryDetails" component={InventoryDetails} />
      <Stack.Screen name="PriceTags" component={PriceTags} />
      <Stack.Screen name="TaskList" component={TaskList} />
    </Stack.Navigator>
  );
};

const TabScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
        headerShown: false,
      }}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{title: 'Главная'}}
      />
      <Drawer.Screen
        name="FoodServiceOrdersList"
        component={FoodServiceOrdersList}
        options={{title: 'Заказы на склад'}}
      />
      <Drawer.Screen
        name="ExternalOrdersList"
        component={ExternalOrdersList}
        options={{title: 'Заказы поставщикам'}}
      />
      <Drawer.Screen
        name="PurchasesPTU"
        component={PurchasesPTU}
        options={{title: 'ПТУ(Cклад)'}}
      />
      <Drawer.Screen
        name="PurchaseList"
        component={PurchasesList}
        options={{title: 'ПТУ(Поставщики)'}}
      />
      <Drawer.Screen
        name="InventoryList"
        component={InventoryList}
        options={{title: 'Инвентаризация'}}
      />
      <Drawer.Screen
        name="PriceTags"
        component={PriceTags}
        options={{title: 'Ценники'}}
      />
      <Drawer.Screen
        name="TaskList"
        component={TaskList}
        options={{title: 'Задачи'}}
      />
      <Drawer.Screen
        name="Downloading"
        component={Downloading}
        options={{title: 'Загрузки'}}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{title: 'Настройки'}}
      />
      <Drawer.Screen
        name="LogOutButton"
        component={LogOutButton}
        options={{title: 'Выйти'}}
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  const {user} = useContext(GlobalContext);
  const screen = 'SplashScreen';
  // user?.type ? 'TabScreen' : 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screen}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabScreen" component={TabScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SplashScreen" component={Splash} />
        <Stack.Screen name="Uploading" component={Uploading} />
        <Stack.Screen name="Downloading" component={Downloading} />
        <Stack.Screen
          name="InternalOrderDetails"
          component={InternalOrderDetails}
        />
        <Stack.Screen
          name="ExternalOrderDetails"
          component={ExternalOrderDetails}
        />
        <Stack.Screen
          name="PurchaseDetailsPTU"
          component={PurchaseDetailsPTU}
        />
        <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />

        <Stack.Screen name="InventoryDetails" component={InventoryDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const App = () => {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
};
