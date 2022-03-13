import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({vFilter, setFilter}) => {
  return (
    <div>
      {/* Поиск */}
      <MyInput
        value={vFilter.query}
        onChange={(e) => setFilter({...vFilter, query: e.target.value})}
        placeholder="Поиск..."
      />

      {/* Сортировка */}
      <div>
        <MySelect
          value={vFilter.sort}
          onChange={seletedSort => setFilter({...vFilter, sort: seletedSort})}
          defaultValue="Сортировка"
          option={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>
    </div>
  );
};

export default PostFilter;
