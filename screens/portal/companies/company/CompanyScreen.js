import { Button, View } from "react-native"
import { PortalTabs } from "../../components/portal-tabs"
import tw from "twrnc"


export const CompanyScreen = ({navigation}) => {


    return <View style={tw`h-full justify-center`}>

        <View style={tw`grid`}>
            <Button title="cancel" onPress={() => navigation.navigate("Portal")}></Button>
            <Button title="Enviar solicitud"></Button>

        </View>
    </View>
}