import {
  Divider,
  InputGroup,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { KeyboardEvent, PropsWithChildren, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

type TableToolbarProps = {
  toolbarItem?: ReactNode;
  subToolbar?: ReactNode;
  toolbarItemFooter?: ReactNode;
  searchTypeComponent?: ReactNode;
  inputGroupName?: string;
  inputGroupPlaceholder?: string;
  inputGroupOnEnter?: (value: string) => void;
};

export const TableToolbar = ({
  toolbarItem,
  subToolbar,
  toolbarItemFooter,
  children,
  searchTypeComponent,
  inputGroupName,
  inputGroupPlaceholder,
  inputGroupOnEnter,
}: PropsWithChildren<TableToolbarProps>) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearch = (searchValue: string) => {
    setSearchValue(searchValue.trim());
    inputGroupOnEnter?.(searchValue.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <>
      <Toolbar data-testid="table-toolbar">
        <ToolbarContent>
          {inputGroupName && (
            <ToolbarItem
              style={{
                height: 42,
                minHeight: 42,
                maxHeight: 42,
                alignSelf: "center",
              }}
            >
              <InputGroup
                className="axis-table-search-group"
                data-testid={inputGroupName}
                style={{
                  width: 270,
                  minWidth: 270,
                  height: 42,
                  minHeight: 42,
                  maxHeight: 42,
                }}
              >
                {searchTypeComponent}
                {inputGroupPlaceholder && (
                  <SearchInput
                    className="axis-table-search"
                    data-testid="table-search-input"
                    style={{
                      width: "100%",
                      height: 42,
                      minHeight: 42,
                      maxHeight: 42,
                    }}
                    placeholder={inputGroupPlaceholder}
                    aria-label={t("search")}
                    value={searchValue}
                    onChange={(_, value) => {
                      setSearchValue(value);
                    }}
                    onKeyDown={handleKeyDown}
                    onClear={() => onSearch("")}
                  />
                )}
              </InputGroup>
            </ToolbarItem>
          )}
          {toolbarItem}
        </ToolbarContent>
      </Toolbar>
      {subToolbar && (
        <Toolbar>
          <ToolbarContent>{subToolbar}</ToolbarContent>
        </Toolbar>
      )}
      <Divider />
      {children}
      <Toolbar>{toolbarItemFooter}</Toolbar>
    </>
  );
};
