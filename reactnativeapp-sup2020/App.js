import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  TextInput,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Pocetna strana',
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Ucesnici')}>
            <Text style={styles.titleText}>Ucesnici</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Uloge')}>
            <Text style={styles.titleText}>Uloge</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Projekti')}>
            <Text style={styles.titleText}>Projekti</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UcesniciScreen extends React.Component {
  static navigationOptions = {
    title: 'Ucesnici',
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() =>
          alert('Na ovom prozoru su prikazane mogucnosti rada sa ucesnicima !')
        }
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UcesniciView')}>
            <Text style={styles.titleText}>Pregled ucesnika</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UcesniciInsert')}>
            <Text style={styles.titleText}>Dodaj ucesnika</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UcesniciDelete')}>
            <Text style={styles.titleText}>Izbrisi ucesnika</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.popToTop()}>
            <Text style={styles.titleText}>Povratak na pocetnu stranu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UlogeScreen extends React.Component {
  static navigationOptions = {
    title: 'Uloge',
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() =>
          alert('Na ovom prozoru su prikazane mogucnosti rada sa ulogama !')
        }
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UlogeView')}>
            <Text style={styles.titleText}>Pregled uloga</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UlogeInsert')}>
            <Text style={styles.titleText}>Dodaj ulogu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UlogeDelete')}>
            <Text style={styles.titleText}>Izbrisi ulogu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.popToTop()}>
            <Text style={styles.titleText}>Povratak na pocetnu stranu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class ProjektiScreen extends React.Component {
  static navigationOptions = {
    title: 'Projekti',
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() =>
          alert('Na ovom prozoru su prikazane mogucnosti rada sa projektima !')
        }
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('ProjektiView')}>
            <Text style={styles.titleText}>Pregled projekata</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('ProjektiInsert')}>
            <Text style={styles.titleText}>Dodaj projekat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('ProjektiDelete')}>
            <Text style={styles.titleText}>Izbrisi projekat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.popToTop()}>
            <Text style={styles.titleText}>Povratak na pocetnu stranu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UcesniciView extends React.Component {
  constructor() {
    super();
    this.state = {
      ucesnici: [],
      tableHead: ['ID', 'Ime', 'Prezime', 'Korisnicko ime', 'Lozinka', 'JMBG'],
      tableData: [],
    };
  }
  componentDidMount = () => {
    fetch(
      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestucesnik',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: 'https://pisio.etfbl.net',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          ucesnici: responseJson,
        });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  static navigationOptions = {
    title: 'Pregled ucesnika',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru su prikazani ucesnici !')}
      />
    ),
  };
  render() {
    const state = this.state;
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView style={styles.container}>
            {this.state.ucesnici.map((x) => {
              this.state.tableData.push([
                x.ucesnikID,
                x.ime,
                x.prezime,
                x.korisnicko_ime,
                x.lozinka,
                x.jmbg,
              ]);
            })}
            <Table borderStyle={{ borderWidth: 1, borderColor: 'yellow' }}>
              <Row
                flexArr={[1, 1, 1, 2, 1, 1]}
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={state.tableData}
                  flexArr={[1, 1, 1, 2, 1, 1]}
                  style={styles.headRow}
                  textStyle={styles.textRow}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.popToTop()}>
            <Text style={styles.ucesnikText}>Povratak na pocetnu stranu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UlogeView extends React.Component {
  constructor() {
    super();
    this.state = {
      uloge: [],
      tableHead: ['ID', 'Naziv'],
      tableData: [],
    };
  }

  componentDidMount = () => {
    fetch(
      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestuloga/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: 'https://pisio.etfbl.net',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          uloge: responseJson,
        });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  static navigationOptions = {
    title: 'Pregled uloga',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() =>
          alert('Na ovom prozoru su prikazane uloge koje ucesnici mogu imati.')
        }
      />
    ),
  };
  render() {
    const state = this.state;
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView style={styles.container}>
            {this.state.uloge.map((x) => {
              this.state.tableData.push([x.ulogaID, x.naziv]);
            })}
            <Table borderStyle={{ borderWidth: 2, borderColor: 'yellow' }}>
              <Row
                flexArr={[1, 1]}
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.textUloga}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={state.tableData}
                  flexArr={[1, 1]}
                  style={styles.headRow}
                  textStyle={styles.textRowUloga}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.popToTop()}>
            <Text style={styles.ucesnikText}>Povratak na pocetnu stranu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class ProjektiView extends React.Component {
  constructor() {
    super();
    this.state = {
      projekti: [],
      tableHead: ['ID', 'Naziv', 'Datum kreiranja'],
      tableData: [],
    };
  }

  componentDidMount = () => {
    fetch(
      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestprojekat/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: 'https://pisio.etfbl.net',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          projekti: responseJson,
        });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  static navigationOptions = {
    title: 'Pregled projekata',
    headerTitleStyle: {
      fontSize: 21.5,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() =>
          alert(
            'Na ovom prozoru su prikazani projekti sa kojima se moze upravljati.'
          )
        }
      />
    ),
  };
  render() {
    const state = this.state;
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView style={styles.container}>
            {this.state.projekti.map((x) => {
              this.state.tableData.push([
                x.projekatID,
                x.naziv,
                x.datum_kreiranja,
              ]);
            })}
            <Table borderStyle={{ borderWidth: 2, borderColor: 'yellow' }}>
              <Row
                flexArr={[1, 1, 1]}
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.textProjekat}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={state.tableData}
                  flexArr={[1, 1, 1]}
                  style={styles.headRow}
                  textStyle={styles.textRow}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.popToTop()}>
            <Text style={styles.ucesnikText}>Povratak na pocetnu stranu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UcesniciInsert extends React.Component {
  state = {
    ime: '',
    prezime: '',
    korisnickoime: '',
    lozinka: '',
    jmbg: '',
  };
  static navigationOptions = {
    title: 'Dodadavanje ucesnika',
    headerTitleStyle: {
      fontSize: 17,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru se dodaju ucesnici.')}
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <View style={styles.containerInsert}>
              <Text style={styles.containerInsert}>Unesite ime ucesnika: </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Ime"
                onChangeText={(text) => this.setState({ ime: text })}
              />
              <Text style={styles.containerInsert}>
                Unesite prezime ucesnika:{' '}
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Prezime"
                onChangeText={(text) => this.setState({ prezime: text })}
              />
              <Text style={styles.containerInsert}>
                Unesite korisnicko ime ucesnika:{' '}
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Korisnicko ime"
                onChangeText={(text) => this.setState({ korisnickoime: text })}
              />
              <Text style={styles.containerInsert}>
                Unesite lozinku ucesnika:{' '}
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry="true"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Lozinka"
                onChangeText={(text) => this.setState({ lozinka: text })}
              />
              <Text style={styles.containerInsert}>
                Unesite JMBG ucesnika:{' '}
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="JMBG"
                onChangeText={(text) =>
                  this.setState({ jmbg: text.replace(/[^0-9]/g, '') })
                }
              />
              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => {
                  var validation = '';
                  if (this.state.ime.length < 1) {
                    validation += 'Ime nije dovoljne duzine ! \n';
                  }

                  if (this.state.prezime.length < 1) {
                    validation += 'Prezime nije dovoljne duzine ! \n';
                  }

                  if (this.state.korisnickoime.length < 1) {
                    validation += 'Korisnicko ime nije dovoljne duzine ! \n';
                  }

                  if (this.state.lozinka.length < 1) {
                    validation += 'Lozinka nije dovoljne duzine ! \n';
                  }

                  if (
                    (this.state.jmbg.length > 13) |
                    (this.state.jmbg.length < 1)
                  ) {
                    validation +=
                      'JMBG nije dobar (Prazan ili preko 13 cifara) ! \n';
                  }

                  if ('' !== validation) {
                    alert(validation);
                  } else {
                    fetch(
                      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestucesnik',
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Origin: 'https://pisio.etfbl.net',
                        },
                        body: JSON.stringify({
                          ime: this.state.ime,
                          prezime: this.state.prezime,
                          korisnicko_ime: this.state.korisnickoime,
                          lozinka: this.state.lozinka,
                          jmbg: this.state.jmbg,
                        }),
                      }
                    )
                      .then((response) => {
                        console.log(response);
                        alert('Uspjesno dodan ucesnik ');
                      })
                      .then((responseJson) => {
                        console.log(responseJson);
                      })
                      .catch((error) => {
                        alert(error);
                        console.error(error);
                      });
                  }
                }}>
                <Text style={styles.insertText}>Dodaj ucesnika</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.insertBackButton}
                onPress={() => this.props.navigation.popToTop()}>
                <Text style={styles.insertText}>
                  Povratak na pocetnu stranu
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UlogeInsert extends React.Component {
  state = {
    naziv: '',
  };
  static navigationOptions = {
    title: 'Dodavanje uloge',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru se dodaju uloge.')}
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <View style={styles.containerInsert}>
              <Text style={styles.containerInsert}> Unesite naziv uloge: </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Naziv"
                onChangeText={(text) => this.setState({ naziv: text })}
              />

              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => {
                  var validation = '';
                  if (this.state.naziv.length < 1) {
                    validation += 'Naziv nije dovoljne duzine ! \n';
                  }

                  if ('' !== validation) {
                    alert(validation);
                  } else {
                    fetch(
                      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestuloga',
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Origin: 'https://pisio.etfbl.net',
                        },
                        body: JSON.stringify({
                          naziv: this.state.naziv,
                        }),
                      }
                    )
                      .then((response) => {
                        console.log(response);
                        alert('Uspjesno dodana uloga ');
                      })
                      .catch((error) => {
                        alert(error);
                        console.error(error);
                      });
                  }
                }}>
                <Text style={styles.insertText}>Dodaj ulogu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.insertBackButton}
                onPress={() => this.props.navigation.popToTop()}>
                <Text style={styles.insertText}>
                  Povratak na pocetnu stranu
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class ProjektiInsert extends React.Component {
  state = {
    naziv: '',
    datumIVrijeme: '',
    godina: '',
    mjesec: '',
    dan: '',
    sat: '',
    minut: '',
  };
  static navigationOptions = {
    title: 'Dodavanje projekta',

    headerTitleStyle: {
      fontSize: 19.5,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru se dodaju projekti.')}
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.containerInsert}>
              <StatusBar barStyle="light-content" />
              <Text style={styles.containerInsert}>
                Unesite naziv projekta:{' '}
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Naziv"
                onChangeText={(text) => this.setState({ naziv: text })}
              />
              <Text style={styles.containerInsert}>
                Unesite datum kreiranja projekta:
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styles.inputProjekat}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Godina"
                  onChangeText={(text) =>
                    this.setState({ godina: text.replace(/[^0-9]/g, '') })
                  }
                />
                <TextInput
                  style={styles.inputProjekat}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Mjesec"
                  onChangeText={(text) =>
                    this.setState({ mjesec: text.replace(/[^0-9]/g, '') })
                  }
                />
                <TextInput
                  style={styles.inputProjekat}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Dan"
                  onChangeText={(text) =>
                    this.setState({ dan: text.replace(/[^0-9]/g, '') })
                  }
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styles.inputProjekat2}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Sat"
                  onChangeText={(text) =>
                    this.setState({ sat: text.replace(/[^0-9]/g, '') })
                  }
                />
                <TextInput
                  style={styles.inputProjekat2}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Minut"
                  onChangeText={(text) =>
                    this.setState({ minut: text.replace(/[^0-9]/g, '') })
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => {
                  var validation = '';
                  if (this.state.naziv.length < 1) {
                    validation += 'Naziv nije dovoljne duzine ! \n';
                    this.state.naziv.match;
                  }
                  if (
                    (this.state.godina.length < 1) |
                    (this.state.godina.length > 4)
                  ) {
                    validation += 'Neispravan unos za godinu ! \n';
                  }
                  if (
                    (this.state.mjesec.length < 1) |
                    (this.state.mjesec.length > 2)
                  ) {
                    validation += 'Neispravan unos za mjesec ! \n';
                  }
                  if (
                    (this.state.dan.length < 1) |
                    (this.state.dan.length > 2)
                  ) {
                    validation += 'Neispravan unos za dan ! \n';
                  }
                  if (
                    (this.state.sat.length < 1) |
                    (this.state.sat.length > 2)
                  ) {
                    validation += 'Neispravan unos za sat ! \n';
                  }
                  if (
                    (this.state.minut.length < 1) |
                    (this.state.minut.length > 2)
                  ) {
                    validation += 'Neispravan unos za minutu ! \n';
                  }

                  this.setState({ datumIVrijeme: 2015 });
                  if ('' !== validation) {
                    alert(validation);
                  } else {
                    let date =
                      this.state.godina +
                      '-' +
                      this.state.mjesec +
                      '-' +
                      this.state.dan +
                      ' ' +
                      this.state.sat +
                      ':' +
                      this.state.minut +
                      ':00';
                    alert(date);
                    fetch(
                      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestprojekat',
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Origin: 'https://pisio.etfbl.net',
                        },
                        body: JSON.stringify({
                          naziv: this.state.naziv,
                          datum_kreiranja: date,
                        }),
                      }
                    )
                      .then((response) => {
                        alert('Uspjesno dodan projekat ');
                      })

                      .catch((error) => {
                        alert(error);
                        console.error(error);
                      });
                  }
                }}>
                <Text style={styles.insertText}>Dodaj projekat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.insertBackButton}
                onPress={() => this.props.navigation.popToTop()}>
                <Text style={styles.insertText}>
                  Povratak na pocetnu stranu
                </Text>
              </TouchableOpacity>
            </View>
            <View></View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UcesniciDelete extends React.Component {
  state = {
    id: '',
  };
  static navigationOptions = {
    title: 'Brisanje ucesnika',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru se brisu ucesnici.')}
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.containerInsert}>
            <Text style={styles.containerDelete}>
              Unesite ID ucesnika kog hocete da obrisete:{' '}
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="ID"
              onChangeText={(text) =>
                this.setState({ id: text.replace(/[^0-9]/g, '') })
              }
            />
            <TouchableOpacity
              style={styles.insertButton}
              onPress={() => {
                var validation = '';
                if (this.state.id.length < 1) {
                  validation += 'ID nije ispravno unesen ! \n';
                }

                if ('' !== validation) {
                  alert(validation);
                } else {
                  fetch(
                    'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestucesnik/' +
                      this.state.id,
                    {
                      method: 'DELETE',
                    }
                  )
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      alert(error);
                      console.error(error);
                    });
                }
              }}>
              <Text style={styles.insertText}>Izbrisi ucesnika</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.insertBackButton}
              onPress={() => this.props.navigation.popToTop()}>
              <Text style={styles.insertText}>Povratak na pocetnu stranu</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class UlogeDelete extends React.Component {
  state = {
    id: '',
  };
  static navigationOptions = {
    title: 'Brisanje uloge',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru se brisu uloge.')}
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <View style={styles.containerInsert}>
              <Text style={styles.containerDelete}>
                Unesite ID uloge koju hocete da obrisete:{' '}
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="ID"
                onChangeText={(text) =>
                  this.setState({ id: text.replace(/[^0-9]/g, '') })
                }
              />
              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => {
                  var validation = '';
                  if (this.state.id.length < 1) {
                    validation += 'ID nije ispravno unesen ! \n';
                  }

                  if ('' !== validation) {
                    alert(validation);
                  } else {
                    fetch(
                      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestuloga/' +
                        this.state.id,
                      {
                        method: 'DELETE',
                      }
                    )
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((error) => {
                        alert(error);
                        console.error(error);
                      });
                  }
                }}>
                <Text style={styles.insertText}>Izbrisi ulogu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.insertBackButton}
                onPress={() => this.props.navigation.popToTop()}>
                <Text style={styles.insertText}>
                  Povratak na pocetnu stranu
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

class ProjektiDelete extends React.Component {
  state = {
    id: '',
  };
  static navigationOptions = {
    title: 'Brisanje projekta',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    headerRight: (
      <Button
        title="INFO"
        color="black"
        onPress={() => alert('Na ovom prozoru se brisu projekti.')}
      />
    ),
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <View style={styles.containerInsert}>
              <Text style={styles.containerDelete}>
                Unesite ID projekta kog hocete da obrisete:{' '}
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="ID"
                onChangeText={(text) =>
                  this.setState({ id: text.replace(/[^0-9]/g, '') })
                }
              />
              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => {
                  var validation = '';
                  if (this.state.id.length < 1) {
                    validation += 'ID nije ispravno unesen ! \n';
                  }

                  if ('' !== validation) {
                    alert(validation);
                  } else {
                    fetch(
                      'https://cors-anywhere.herokuapp.com/http://pisio.etfbl.net/~stefanm/SUP2020/suprestprojekat/' +
                        this.state.id,
                      {
                        method: 'DELETE',
                      }
                    )
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((error) => {
                        alert(error);
                        console.error(error);
                      });
                  }
                }}>
                <Text style={styles.insertText}>Izbrisi projekat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.insertBackButton}
                onPress={() => this.props.navigation.popToTop()}>
                <Text style={styles.insertText}>
                  Povratak na pocetnu stranu
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const MainNavigatorStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Ucesnici: { screen: UcesniciScreen },
    UcesniciView: { screen: UcesniciView },
    UcesniciInsert: { screen: UcesniciInsert },
    UcesniciDelete: { screen: UcesniciDelete },
    Uloge: { screen: UlogeScreen },
    UlogeView: { screen: UlogeView },
    UlogeInsert: { screen: UlogeInsert },
    UlogeDelete: { screen: UlogeDelete },
    Projekti: { screen: ProjektiScreen },
    ProjektiView: { screen: ProjektiView },
    ProjektiInsert: { screen: ProjektiInsert },
    ProjektiDelete: { screen: ProjektiDelete },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'yellow',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 25,
      },
    },
  }
);

const MainNavigatorDrawer = createDrawerNavigator({
  Home: { screen: HomeScreen },
});

const MainNavigator = MainNavigatorStack;

const App = createAppContainer(MainNavigator);
export default App;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
  ucesnikText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
  },
  head: { height: 40, backgroundColor: 'black', color: 'yellow' },
  text: {
    margin: 0,
    color: 'yellow',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 11,
  },
  textUloga: {
    margin: 0,
    color: 'yellow',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 14,
  },
  textProjekat: {
    margin: 0,
    color: 'yellow',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 12.5,
  },
  textRow: {
    margin: 2,
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 9,
    alignSelf: 'center',
  },
  textRowUloga: {
    margin: 2,
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
  },
  headRow: { height: 30, backgroundColor: 'black', color: 'yellow' },
  container: { padding: 5, paddingTop: 5, backgroundColor: 'yellow' },
  containerInsert: {
    backgroundColor: 'black',
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 18,
  },
  containerDelete: {
    backgroundColor: 'black',
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 8,
  },
  input: {
    height: 40,
    backgroundColor: 'yellow',
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  inputProjekat: {
    height: 40,
    width: 108,
    backgroundColor: 'yellow',
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  inputProjekat2: {
    height: 40,
    width: 162,
    backgroundColor: 'yellow',
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  wrapper: { flexDirection: 'cell' },
  insertButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 25,
    borderTopWidth: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'yellow',
  },
  insertText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
  insertBackButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderTopWidth: 0,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'yellow',
  },
});
