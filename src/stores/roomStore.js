import { makeObservable, observable, action } from "mobx";
import slugify from "react-slugify";
import axios from "axios";
class RoomStore {
  rooms = [
    {
      image:
        "https://mk0peerspaceres622pi.kinstacdn.com/wp-content/uploads/Eco-Friendly-Executive-Boardroom-santa-monica-la-los-angeles-rental-1200x600.jpg",
      id: 1,
      title: "Meeting room",
      description: "Only people invited for the meeting!",
      slug: "meeting-room",
      messages: [
        {
          msg: "Hi Hacker, How are you?",
        },
        {
          msg: "I am fine.",
        },
      ],
    },
  ];

  constructor() {
    makeObservable(this, {
      rooms: observable,
      createRoom: action,
      updateRoom: action,
      deleteRoom: action,
      createMsg: action,
    });
  }

  fetchRoom = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms	"
      );
      console.log(response.data);
      this.rooms = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  createRoom = async (room) => {
    // room.id = this.rooms[this.rooms.length - 1].id + 1;
    // room.slug = slugify(room.title);
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        room
      );
      this.rooms.push([...this.rooms, response.data]);
    } catch (error) {
      console.error(error);
    }
    this.rooms.push(room);
  };

  deleteRoom = async (roomId) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
      this.rooms = this.rooms.filter((room) => room.id !== roomId);
    } catch (error) {
      console.error(error);
    }
  };
  createMsg = async (roomId, msg) => {
    const room = this.rooms.find((_room) => _room.id === +roomId);
    room.messages.push(msg);
    // try {
    //   const response = await axios.post(
    //     `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
    //     msg
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  };

  updateRoom = async (updatedRoom) => {
    const room = this.rooms.find((room) => room.id === updatedRoom.id);
    room.title = updatedRoom.title;
    room.description = updatedRoom.description;
    room.image = updatedRoom.image;
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        room
      );
    } catch (error) {
      console.error(error);
    }
  };
}

const roomStore = new RoomStore();
export default roomStore;
