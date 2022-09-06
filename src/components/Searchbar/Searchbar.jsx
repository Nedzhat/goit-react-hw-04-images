import { useState } from "react";
import PropTypes from 'prop-types';
import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

const handleChangeSearchQuery = event => {
    event.preventDefault();
    setQuery(event.currentTarget.value);
    }

const handleSubmit = event => {
        event.preventDefault();
        if (query.trim() === '') {
        return toast.error("Необходимо заполнить поле поиска!");
        }
        onSubmit(query);
    setQuery('');
    }

    
        return <Header>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <span>Search</span>
                </SearchFormButton>

                <SearchFormInput
                    type="text"
                    autocomplete="off"
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleChangeSearchQuery}
                />
            </SearchForm>
        </Header >
    }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};