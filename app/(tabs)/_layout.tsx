
import {Redirect, Slot, Stack, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {Text, View} from "react-native";
import cn from "clsx";
import { Ionicons } from '@expo/vector-icons';

const TabBarIcon = ({focused, iconName, title}: {focused: boolean, iconName: keyof typeof Ionicons.glyphMap, title: string}) => (
    <View className={'flex items-center justify-center min-w-20 gap-1'}>
        <View className={cn(
            'w-12 h-12 rounded-2xl flex-center transition-all',
            focused ? 'bg-primary' : 'bg-transparent'
        )}>
            <Ionicons
                name={iconName}
                size={24}
                color={focused ? '#ffffff' : '#878787'}
            />
        </View>
        <Text className={cn('text-xs font-rubik-semibold', focused ? "text-primary":"text-gray-100")}>{title}</Text>
    </View>
)

const TabLayout = () => {
    const {isAuthenticated} = useAuthStore()

    if(!isAuthenticated) return <Redirect href={'/sign-in'}/>
    return(
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle:{
                    borderRadius: 30,
                    marginHorizontal: 16,
                    height: 75,
                    position: 'absolute',
                    bottom: 25,
                    backgroundColor: 'white',
                    paddingBottom: 8,
                    paddingTop: 8,
                    borderTopWidth: 0,
                    shadowColor: '#000000',
                    shadowOffset:{width:0, height:4},
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    elevation: 8,
                }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon:({focused}) => <TabBarIcon focused={focused} title={"Home"} iconName="home" />
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon:({focused}) => <TabBarIcon focused={focused} title={"Cart"} iconName="cart" />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon:({focused}) => <TabBarIcon focused={focused} title={"Profile"} iconName="person" />
                }}
            />
        </Tabs>
    )
};

export default TabLayout;