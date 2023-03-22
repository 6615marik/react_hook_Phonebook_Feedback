// import { nanoid } from 'nanoid';

export const Filtr = ({ filtr, onFiltr }) => {
  return (
    <>
      <h2>Find contacts by name</h2>
      <input type="text" name="filtr" value={filtr} onChange={onFiltr} />
    </>
  );
};
