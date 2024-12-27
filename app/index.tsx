import { createRconClient } from "@/hooks/rcon.ts";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [onlinePlayers, setOnlinePlayers] = useState("");

  useEffect(() => {
    createRconClient({
      host: "192.168.1.116",
      port: 25575,
      pass: "password",
    })
      .then((rcon) => rcon.exec("list").finally(() => rcon.close()))
      .then(setOnlinePlayers)
      .catch(console.error);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{onlinePlayers}</Text>
    </View>
  );
}
