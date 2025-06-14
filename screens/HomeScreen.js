import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import words from "../src/words";
import { AntDesign } from "@expo/vector-icons";
import {
  BannerAd,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { useDispatch, useSelector } from "react-redux";

// const RewardAdUnit = "ca-app-pub-1626954199790977/8565198147";

const HomeScreen = () => {
  const theme = { mode: "light" };
  let activeColors = colors[theme.mode];

  const navigation = useNavigation();

  // --------------------------CHAT GPT API--------------------------
  // const ChatGPTAPI =
  //   "https://api.openai.com/v1/engines/text-davinci-002/completions";

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [examples, setExamples] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [antonyms, setAntonyms] = useState("");
  const [advancedExamples, setAdvancedExamples] = useState("");

  const fetchPronuncitaion = async () => {
    try {
      const response = await axios.post(
        // ChatGPTAPI,
        {
          prompt: `
          Can you please give me the only the phonetic spelling of the word to help me pronounce it ${word}.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          
        }
      );

      setPronunciation(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDefinition = async () => {
    try {
      const response = await axios.post(
        // ChatGPTAPI,
        {
          prompt: `
          Can you please only provide a college level defintion of the word with type of speech: ${word}.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          
        }
      );

      setDefinition(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExamples = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide 5 examples of the word being used in a sentence: ${word}
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: ``,
          },
        }
      );

      setExamples(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSynonyms = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide 5 synonyms of the word: ${word} in a list.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
         
        }
      );

      setSynonyms(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAntonyms = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Can you please only provide 5 antonyms of the word: ${word} in a list.
          `,
          max_tokens: 1024,
          temperature: 1,
        },
        {
          
        }
      );

      setAntonyms(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (text) => {
    setWord(text);
  };

  const fetchAdvancedExamples = async () => {
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Give me only 5 advanced examples of the word: ${word} in modern times/news with text citation.
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

      setAdvancedExamples(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = () => {
    fetchDefinition();
    fetchPronuncitaion();
    fetchExamples();
    fetchSynonyms();
    fetchAntonyms();
    fetchAdvancedExamples();
  };

  const [buttonPress, setButtonPress] = useState(false);

  const navigateToScreen = () => {
    setButtonPress(true);
  };

  // --------------------------Use useffect hook with touchableopacity to transfer data to VocabwordScreen.js--------------------------
  useEffect(() => {
    // Check if button has been pressed
    if (buttonPress) {
      // Navigate to another screen if definition is not empty
      if (definition !== "") {
        navigation.navigate("Vocabword", {
          chat: definition,
          word: word,
          pronunce: pronunciation,
          example: examples,
          synonym: synonyms,
          antonym: antonyms,
          advancedExample: advancedExamples,
        });
      } else {
        setButtonPress(false);
      }
    }
  }, [
    buttonPress,
    definition,
    navigation,
    pronunciation,
    examples,
    synonyms,
    antonyms,
    advancedExamples,
  ]);

  // -----------------------New Word Generator-----------------------
  const [generateword, setgenerateword] = useState("");
  const [newwordgenerated, setnewword] = useState("");

  const generateNewWord = async () => {
    const newWordsArray = words;
    const randomIndex = Math.floor(Math.random() * newWordsArray.length);
    const randomWord = newWordsArray[randomIndex];

    setnewword(randomWord);
    await fetchDefinition();
    try {
      const response = await axios.post(
        ChatGPTAPI,
        {
          prompt: `
          Give me a very short 15 word defintion of the word: ${randomWord}. 
          `,
          max_tokens: 1024,
          // temperature: 0.5,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${"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"}`,
          },
        }
      );

      setgenerateword(response.data.choices[0].text.trim());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  // const adUnitId = "ca-app-pub-1626954199790977/1604150074";

  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.tokens);

  const handlePlusPress = () => {
    dispatch({ type: "INCREMENT_TOKENS" });
  };

  const handleDefinePress = () => {
    if (tokens === 0) {
      Alert.alert("Need more tokens", "Press plus button to gain more tokens", [
        { text: "OK" },
      ]);
    } else {
      handleButtonPress();
      navigateToScreen();
      navigation.navigate("Vocabword", {
        chat: definition,
        word: word,
        pronunce: pronunciation,
        example: examples,
        synonym: synonyms,
        antonym: antonyms,
        advancedExample: advancedExamples,
      });
      dispatch({ type: "DECREMENT_TOKENS" });
    }
  };

  const [loaded, setLoaded] = useState(false);

  const handleAdButtonClick = () => {
    const rewarded = RewardedAd.createForAdRequest(RewardAdUnit, {
      requestNonPersonalizedAdsOnly: true,
      keywords: [
        "English",
        "Language",
        "Learning",
        "Education",
        "Learning New Language",
      ],
    });

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        rewarded.show();
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        // console.log("User earned reward of ", reward);
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#f4f4f4"
        backgroundColor: activeColors.primary,
      }}
    >
      <View style={{ marginLeft: 25, marginRight: 25, marginTop: 40 }}>
        <View style={{ marginTop: 25 }}>
          <Text
            style={{
              // color: "#1d1d1d",
              color: activeColors.secondary,
              fontWeight: "700",
              fontSize: 25,
            }}
          >
            Hello, ready to learn!
          </Text>
          <TextInput
            placeholder="Look up a word"
            placeholderTextColor={activeColors.tint}
            onChangeText={handleInput}
            value={word}
            style={{
              // backgroundColor: "#fff",
              backgroundColor: activeColors.tertiary,
              borderColor: activeColors.secondary,
              // borderColor: "#1d1d1d",
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
              style={{
                // backgroundColor: "#1d1d1d",
                backgroundColor: activeColors.secondary,
                width: 150,
                padding: 10,
                marginTop: 10,
                borderRadius: 10,
              }}
              onPress={handleDefinePress}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 15,
                  marginTop: "auto",
                  marginBottom: "auto",
                  // color: "#fff",
                  color: activeColors.tertiary,
                }}
              >
                Define
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  padding: 10,
                  justifyContent: "space-between",
                  width: 145,
                  borderWidth: 2,
                  borderColor: "#000",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handlePlusPress();
                    handleAdButtonClick();
                  }}
                >
                  <AntDesign name="pluscircleo" size={24} color="#000" />
                </TouchableOpacity>
                <View
                  style={{
                    borderLeftWidth: 1.5,
                    borderColor: "#000",
                    paddingLeft: 10,
                  }}
                >
                  <Text style={{ color: "#000", fontWeight: "700" }}>
                    Tokens: {tokens}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <View>
            <Text
              style={{
                // color: "#1d1d1d",
                color: activeColors.secondary,
                fontWeight: "700",
                fontSize: 21,
              }}
            >
              Practice English
            </Text>
            <Text style={{ marginTop: 4, color: activeColors.secondary }}>
              Improve your vocabulary!
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: "#000",
              backgroundColor: activeColors.other,
              borderRadius: 10,
              height: 215,
              marginTop: 18,
            }}
          >
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 16 }}>
              <Text
                style={{
                  fontWeight: "100",
                  // color: "#7f7f7f"
                  color: activeColors.tint,
                }}
              >
                New Word
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  //  color: "#fff",
                  color: activeColors.tertiary,
                  fontSize: 24,
                }}
              >
                {newwordgenerated}
              </Text>
              <Text
                style={{
                  // color: "#fff",
                  color: activeColors.tertiary,
                  marginTop: 8,
                }}
              >
                {generateword}
              </Text>
              <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.LARGE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
