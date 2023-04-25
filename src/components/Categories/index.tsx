import { FC, useState } from "react";
import CategoriesProps from "./Categories.props";
import Container, { CategoryItem } from "./Categories.style";

const Categories: FC<CategoriesProps> = ({ categories, onSelected }) => {
  return (
    <Container>
      {categories.map((category, index) => (
        <CategoryItem
          key={category.id}
          hasChild={!!(category.child && category.child.length > 0)}
        >
          <div
            className="category--wrapper"
            onClick={() => onSelected(category, index)}
          >
            <span className="category--icon">{category.icon}</span>
            <span className="category--title">{category.title}</span>
          </div>
          {category.child && category.child.length > 0 && (
            <Categories categories={category.child} onSelected={onSelected} />
          )}
        </CategoryItem>
      ))}
    </Container>
  );
};

export default Categories;
