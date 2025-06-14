import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

const VocabwordScreen = ({ route }) => {
  const navigation = useNavigation();

  const theme = { mode: "light" };
  let activeColors = colors[theme.mode];

  const { chat, word, pronunce, example, synonym, antonym, advancedExample } =
    route.params;

  // --------------------------CHAT GPT API--------------------------
  // const ChatGPTAPI =
  //   "https://api.openai.com/v1/engines/text-davinci-002/completions";

  const [word1, setWord1] = useState("");
  const [definition1, setDefinition1] = useState("");
  const [pronunciation1, setPronunciation1] = useState("");
  const [examples1, setExamples1] = useState("");
  const [synonyms1, setSynonyms1] = useState("");
  const [antonyms1, setAntonyms1] = useState("");
  const [advancedExamples1, setAdvancedExamples1] = useState("");

  const fetchPronuncitaion1 = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please give me the only the phonetic spelling of the word to help me pronounce it  ${
            word1 ? word1 : word
          }.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setPronunciation1(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDefinition1 = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide a college level defintion of the word with type of speech: ${
            word1 ? word1 : word
          }.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setDefinition1(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExamples1 = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide 5 examples of the word being used in a sentence:  ${
            word1 ? word1 : word
          }.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setExamples1(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSynonyms1 = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide 5 synonyms of the word: ${
            word1 ? word1 : word
          } in a list.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setSynonyms1(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAntonyms1 = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide 5 antonyms of the word:  ${
            word1 ? word1 : word
          } in a list.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setAntonyms1(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAdvancedExamples1 = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Give me only 5 advanced examples of the word:  ${
            word1 ? word1 : word
          } in modern times/news with text citation.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setAdvancedExamples1(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput1 = (text) => {
    setWord1(text);
  };

  const handleButtonPress1 = () => {
    fetchPronuncitaion1();
    fetchDefinition1();
    fetchExamples1();
    fetchAntonyms1();
    fetchSynonyms1();
    fetchAdvancedExamples1();
  };

  // --------------------------Text to speech--------------------------
  const speakGreeting = () => {
    if (word1) {
      const greeting = `${word1}`;
      Speech.speak(greeting);
    } else {
      const greeting = `${word}`;
      Speech.speak(greeting);
    }
  };

  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.tokens);

  const handleLookUpPress = () => {
    if (tokens === 0) {
      Alert.alert("Need more tokens", "Press plus button to gain more tokens", [
        { text: "OK" },
      ]);
    } else {
      handleButtonPress1();
      dispatch({ type: "DECREMENT_TOKENS" });
    }
  };

  const handleRefreshPress = () => {
    if (tokens === 0) {
      Alert.alert("Need more tokens", "Press plus button to gain more tokens", [
        { text: "OK" },
      ]);
    } else {
      handleButtonPress1();
      dispatch({ type: "DECREMENT_TOKENS" });
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        // backgroundColor: "#f4f4f4",
        backgroundColor: activeColors.primary,
      }}
    >
      <View style={{ marginLeft: 25, marginRight: 25, marginBottom: 30 }}>
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons
              style={{
                // backgroundColor: "#ffffff",
                backgroundColor: activeColors.tertiary,
                padding: 10,
                borderRadius: 10,
              }}
              name="chevron-back"
              size={24}
              // color="black"
              color={activeColors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              //  color: "#1d1d1d",
              color: activeColors.secondary,
              fontWeight: "700",
              fontSize: 21,
            }}
          >
            Your Word is Defined!
          </Text>
          <TextInput
            onChangeText={handleInput1}
            value={word1}
            placeholder="Look up a word"
            placeholderTextColor={activeColors.tint}
            style={{
              // backgroundColor: "#fff",
              // borderColor: "#1d1d1d",
              backgroundColor: activeColors.tertiary,
              borderColor: activeColors.secondary,
              borderWidth: 1.5,
              borderRadius: 10,
              padding: 8,
              marginTop: 15,
              color: activeColors.secondary,
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   handleButtonPress1();
              //   dispatch({ type: "DECREMENT_TOKENS" });
              //   // onPressButton();
              // }}
              onPress={handleLookUpPress}
              style={{
                // backgroundColor: "#1d1d1d",
                backgroundColor: activeColors.secondary,
                width: 150,
                padding: 10,
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 15,
                  // color: "#fff",
                  color: activeColors.tertiary,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                Look up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => {
              //   handleButtonPress1();
              //   dispatch({ type: "DECREMENT_TOKENS" });
              // }}
              onPress={handleRefreshPress}
              style={{
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <FontAwesome
                style={{ marginTop: "auto", marginBottom: "auto" }}
                name="refresh"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "#ffffff",
            backgroundColor: activeColors.tertiary,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <View style={{ padding: 20 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {word1 ? (
                <Text
                  style={{
                    color: activeColors.secondary,
                    fontWeight: "700",
                    fontSize: 24,
                  }}
                >
                  {word1}
                </Text>
              ) : (
                <Text
                  style={{
                    color: activeColors.secondary,
                    fontWeight: "700",
                    fontSize: 24,
                  }}
                >
                  {word}
                </Text>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  padding: 6,
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                }}
                onPress={speakGreeting}
              >
                <AntDesign
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  name="sound"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            {pronunciation1 ? (
              <Text
                style={{
                  // color: "#d8d8d8",
                  color: activeColors.accent,
                  marginBottom: 20,
                }}
              >
                {pronunciation1}
              </Text>
            ) : (
              <Text
                style={{
                  // color: "#d8d8d8",
                  color: activeColors.accent,
                  marginBottom: 20,
                }}
              >
                {pronunce}
              </Text>
            )}
            <Text
              style={{
                // color: "#374151",
                color: activeColors.headers,
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              Definition
            </Text>
            {definition1 ? (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {definition1}
              </Text>
            ) : (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {chat}
              </Text>
            )}

            <Text
              style={{
                // color: "#374151",
                color: activeColors.headers,
                fontWeight: "700",
                fontSize: 15,
                marginTop: 15,
              }}
            >
              Examples
            </Text>
            {examples1 ? (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {examples1}
              </Text>
            ) : (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {example}
              </Text>
            )}

            <Text
              style={{
                // color: "#374151",
                color: activeColors.headers,
                fontWeight: "700",
                fontSize: 15,
                marginTop: 15,
              }}
            >
              Synonyms
            </Text>
            {synonyms1 ? (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {synonyms1}
              </Text>
            ) : (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {synonym}
              </Text>
            )}

            <Text
              style={{
                // color: "#374151",
                color: activeColors.headers,
                fontWeight: "700",
                fontSize: 15,
                marginTop: 15,
              }}
            >
              Antonyms
            </Text>
            {antonyms1 ? (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {antonyms1}
              </Text>
            ) : (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {antonym}
              </Text>
            )}

            <Text
              style={{
                // color: "#374151",
                color: activeColors.headers,
                fontWeight: "700",
                fontSize: 15,
                marginTop: 15,
              }}
            >
              Modern Time Examples
            </Text>
            {advancedExamples1 ? (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {advancedExamples1}
              </Text>
            ) : (
              <Text
                style={{
                  color: activeColors.secondary,
                }}
              >
                {advancedExample}
              </Text>
            )}
            <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default VocabwordScreen;
