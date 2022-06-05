import ToastUIEditor from "./ToastUIEditor";

const IllustEditor = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "30px",
        gap: "20px",
      }}
    >
      <h1>일러스트 추가</h1>
      <ToastUIEditor />
    </div>
  );
};

export default IllustEditor;
