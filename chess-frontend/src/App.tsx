import { Route, Routes, useNavigate } from "react-router-dom";
import Landingpage from "./screens/Landingpage";
import { Join } from "./screens/Joinpage";
import Lobby from "./screens/Lobby";
import { useEffect } from "react";
import { useAuthStore, useMessageStore, useSocketStore } from "./store/auth";
import { OnlinePlayers, SocketMessage } from "./types/socket";
import {
  Button,
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

function App() {
  const navigate = useNavigate();
  const { connect, disconnect, logoutUser, isLoggedIn } = useAuthStore(
    (state) => state
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { socket } = useSocketStore((state) => state);
  const { addMessage } = useMessageStore();
  useEffect(() => {
    if (isLoggedIn) connect();
    return () => disconnect();
  }, [isLoggedIn]);
  useEffect(() => {
    socket?.on(SocketMessage.LogoutUser, () => {
      onOpen();
    });
    socket?.on(SocketMessage.OnlinePlayers, (data: OnlinePlayers[]) => {
      fetchUserData(data);
    });
    if (socket) {
      socket.on(SocketMessage.Message, (data) => {
        const newMessage: Chat = {
          owner: "other",
          message: data?.message,
          socketId: data?.socketId,
        };
        addMessage(newMessage);
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
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
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
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                Another user is trying to login via the same account
              </ModalBody>
              <ModalFooter>
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
