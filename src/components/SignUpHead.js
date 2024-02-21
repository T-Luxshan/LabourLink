import React from 'react'
import { View, Text } from 'react-native'

const SignupHead = (props) => {
  return (
    <View>
        <View >
                {/* Labour link  tittle */}
                  <Text  style={{ fontWeight: '600',
                         fontSize: 32, 
                         textAlign:'center', marginTop:10}}>Labour <Text style={{ color: '#F97300',textAlign:'center', marginTop:10 }}>LINK</Text></Text>
            </View>
            <View>
              {/* Create your account for the sub tittle */}
                <Text style={{fontWeight: '500',fontSize: 20,
                        marginTop:10, textAlign:'center', marginVertical:20}}>Create your {props.userRole} account</Text>
            </View>
    </View>
  )
}

export default SignupHead