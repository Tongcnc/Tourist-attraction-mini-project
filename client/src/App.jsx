import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    getTourist("");
  }, []);

  function textHandler(e) {
    getTourist(e.target.value);
  }

  // did not work >>> need to fix
  function addTagToInput(tag) {
    const tagToInput = `${selectedTag} ${tag}`.trim();
    setSelectedTag(tag);
    getTourist(tagToInput);
  }
  // <<<<<<

  const getTourist = async (input) => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${input}`
      );
      console.log(result.data.data);
      setMessage(result.data.data);
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  return (
    <div className="flex flex-col  items-center m-8">
      <h1 className="text-blue-500 text-5xl p-8 font-semibold">เที่ยวไหนดี</h1>
      <div className="flex flex-col mb-10">
        <p className="text-black">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={textHandler}
          className=" p-2 border-b-2 w-[50rem] text-center"
        />
      </div>

      <div>
        {message.map((item, index) => (
          <div key={index} className="flex p-4">
            <img
              src={item.photos[0]}
              alt="tourist"
              className="w-[300px] h-[250px] rounded-3xl"
            />

            <div className="mx-8">
              <h2 className="text-2xl text-black">{item.title}</h2>
              {item.description.length > 100 ? (
                <p>{item.description.slice(0, 100) + "..."}</p>
              ) : (
                <p>{item.description}</p>
              )}
              <a
                href={item.url}
                target="_blank"
                className="text-blue-500 underline"
              >
                อ่านต่อ
              </a>
              <br />

              {/* tag */}
              <span>หมวด</span>
              {item.tags
                .filter((tag, tagIndex) => tagIndex !== 4)
                .map((tag, tagIndex) => (
                  <button
                    key={tagIndex}
                    onClick={() => addTagToInput(tag)}
                    className="underline px-1"
                  >
                    {tag}
                  </button>
                ))}
              {item.tags.length > 4 && <span>และ</span>}
              {item.tags.length > 4 && (
                <button
                  onClick={() => addTagToInput(item.tags[4])}
                  className="underline px-1"
                >
                  {item.tags[4]}
                </button>
              )}

              {/* photos x3 */}
              <div className="flex gap-6 mt-1">
                {item.photos
                  .filter((photo, photoIndex) => photoIndex !== 0)
                  .map((photoUrl, photoIndex) => (
                    <img
                      key={photoIndex}
                      src={photoUrl}
                      alt=""
                      className="w-[80px] h-[80px] my-5 rounded-lg "
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
