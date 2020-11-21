/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {GlobalImgs} from '@assets/imgs';
import {Secondary_color} from '../../Helper/Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {width, height} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import HttpHelper from '../../Helper/HttpHelper';
import {connect} from 'react-redux';
import * as actions from '../actions';

const goNewContact = async props => {
  HttpHelper.doPost(
    'create_contact',
    {
      user_id: props.auth.id,
      user_data: props.auth.data,
    },
    async data => {
      if (data.status === 'success') {
        props.setContactId(data.contact_id);
        props.navigation.navigate('chat', {
          contact_id: props.auth.contact_id,
        });
      }
    },
    err => {
      alert(err);
    },
  );
};

function SideMenu(props) {
  return (
    <>
      <ImageBackground
        style={{width: '100%', height: height(100), shadowColor: '#ff0000'}}
        imageStyle={{borderTopRightRadius: 40, borderBottomRightRadius: 40}}
        source={GlobalImgs.bg}>
        <View style={styles.userInfo}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.navigate('edit_profile');
            }}>
            <View style={styles.avatar}>
              <Avatar
                rounded
                containerStyle={{borderWidth: 2, borderColor: '#fff'}}
                size={width(25)}
                source={
                  props.auth.photo == null || props.auth.photo.original == null
                    ? GlobalImgs.default_user
                    : {
                        uri: props.auth.photo.original,
                      }
                }
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Secondary_color(),
                }}>
                {props.auth.first_name} {props.auth.last_name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('product_list');
          }}>
          <Entypo
            name="shopping-bag"
            color={Secondary_color()}
            size={24}
            style={styles.drawerItem_icon}
          />
          <Text style={[styles.drawerItem_txt, {color: Secondary_color()}]}>
            View Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('favs');
          }}>
          <MaterialIcons
            name="favorite-border"
            color={Secondary_color()}
            size={24}
            style={styles.drawerItem_icon}
          />
          <Text style={[styles.drawerItem_txt, {color: Secondary_color()}]}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('mycart');
          }}>
          <AntDesign
            name="shoppingcart"
            color={Secondary_color()}
            size={24}
            style={styles.drawerItem_icon}
          />
          <Text style={[styles.drawerItem_txt, {color: Secondary_color()}]}>
            My Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            if (
              props.auth.contact_id === null ||
              props.auth.contact_id === ''
            ) {
              goNewContact(props);
            } else {
              props.navigation.navigate('chat', {
                contact_id: props.auth.contact_id,
              });
            }
          }}>
          <Entypo
            name="chat"
            color={Secondary_color()}
            size={24}
            style={styles.drawerItem_icon}
          />
          <Text style={[styles.drawerItem_txt, {color: Secondary_color()}]}>
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={async () => {
            props.removeUser();
            props.navigation.navigate('login');
          }}>
          <AntDesign
            name="logout"
            color={Secondary_color()}
            size={24}
            style={styles.drawerItem_icon}
          />
          <Text style={[styles.drawerItem_txt, {color: Secondary_color()}]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerStyle: {
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: width(70),
  },
  userInfo: {
    marginTop: height(8),
    marginBottom: height(2),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  drawerItem_icon: {
    marginRight: 7,
  },
  drawerItem_txt: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: '#B034CD',
    borderBottomWidth: 1,
  },
});

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions,
)(SideMenu);
