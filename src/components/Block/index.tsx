import { v4 as uuid } from "uuid";

interface BlockProps {
  title: string;
  items: string[];
}

interface BlockItemProps {
  item: string;
}

const Block = ({ title, items }: BlockProps) => {
  return (
    <div className="bg-shades-1 border-shades-3 border rounded-lg lg:p-1-5 p-1-45 shadow-lg">
      <article>
        <h1 className="text-1xl text-shades-10 mb-1 font-bold">{title}</h1>
        <ul>
          {items.map((item) => {
            return (
              <li key={uuid()} className="mb-1 last:mb-0 list-disc ml-1-25">
                <BlockItem item={item} />
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};

const BlockItem = ({ item }: BlockItemProps) => {
  return <p className="text-shades-6">{item}</p>;
};

export default Block;
