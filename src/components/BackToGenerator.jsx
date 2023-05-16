export default function BackToGenerator({ setStartMatch }) {
  return (
    <div className="button__back-layout">
      <button
        className="button__back-inner"
        onClick={() => setStartMatch(false)}
      >{`<-- Zurück zum Generator`}</button>
    </div>
  );
}
