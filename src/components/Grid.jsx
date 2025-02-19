import React from "react";

const Grid = ({ items, renderItem, title, text, gridClasses = "" }) => {
  return (
    <section className="my-8 px-4 bg-grey-100">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-center text-primaryBackground">
          {title}
        </h2>
      )}
      {text && <h2 className="text-2xl font-bold mb-4 text-center">{text}</h2>}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-grey-100 ${gridClasses}`}
      >
        {items.map((item) => (
          <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Grid;
