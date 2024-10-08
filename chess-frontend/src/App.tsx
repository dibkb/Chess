import { Route, Routes, useNavigate } from "react-router-dom";
import Landingpage from "./screens/Landingpage";
import { Join } from "./screens/Joinpage";
import Lobby from "./screens/Lobby";
import { useEffect, useState } from "react";
import { useAuthStore, useMessageStore, useSocketStore } from "./store/auth";
import { OnlinePlayers, SocketMessage } from "./types/socket";
import {
  Avatar,
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorPage from "./screens/ErrorPage";
import { fetchUserData } from "./api/fetchData";
import { Chat } from "./types/chat";
import { Game } from "./screens/Game";
import { ApppageModal } from "./components/ModalBody/ApppageModal";
import { ChallengePayload } from "./types/piece";
import { ChallengerDetails } from "./components/ChallengerDetails";

function App() {
  const navigate = useNavigate();
  const { connect, disconnect, logoutUser, isLoggedIn } = useAuthStore(
    (state) => state
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { socket } = useSocketStore((state) => state);
  const { addMessage } = useMessageStore();
  const [modalType, setModalType] = useState<
    SocketMessage.LogoutUser | SocketMessage.Challenge
  >();
  const [challengePayload, setChallengePayload] = useState<ChallengePayload>();
  useEffect(() => {
    if (isLoggedIn) connect();
    return () => disconnect();
  }, [isLoggedIn]);
  useEffect(() => {
    socket?.on(SocketMessage.LogoutUser, () => {
      // socket--duplicate--user
      setModalType(SocketMessage.LogoutUser);
      onOpen();
    });
    socket?.on(SocketMessage.OnlinePlayers, (data: OnlinePlayers[]) => {
      fetchUserData(data);
    });
    if (socket) {
      // socket--message
      socket.on(SocketMessage.Message, (data) => {
        const newMessage: Chat = {
          owner: "other",
          message: data?.message,
          socketId: data?.socketId,
        };
        addMessage(newMessage);
      });
      // socket--challenge
      socket.on(SocketMessage.Challenge, (data: ChallengePayload) => {
        // TODO :render modal
        setChallengePayload(data);
        setModalType(SocketMessage.Challenge);
        onOpen();
      });
    }
  }, [socket]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/join" element={<Join />} />
        {/* protected route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {modalType === SocketMessage.LogoutUser && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          backdrop="blur"
          isKeyboardDismissDisabled={true}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ApppageModal
                  Header={"Logout"}
                  Body={"Another user is trying to login via the same account"}
                  Footer={
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        logoutUser();
                        onClose();
                        return navigate("/join");
                      }}
                    >
                      Logout
                    </Button>
                  }
                />
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {modalType === SocketMessage.Challenge && challengePayload && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          backdrop="blur"
          isKeyboardDismissDisabled={true}
          placement="top"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <ChallengerDetails {...challengePayload} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    color="success"
                    variant="solid"
                    onPress={() => {
                      return navigate("/game");
                    }}
                  >
                    Accept Challenge⚔️
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default App;
