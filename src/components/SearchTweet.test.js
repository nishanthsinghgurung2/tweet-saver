import SearchTweet from "./SearchTweet"
import { render, fireEvent } from "@testing-library/react";

describe('SearchTweet', () => {
    it('should render searchTweet component', () => {
        const { getByTestId } = render(<SearchTweet />);
        expect(getByTestId('searchTweet')).toBeDefined();
        expect(getByTestId('searchTxt')).toBeDefined();
        expect(getByTestId('searchBtn')).toBeDefined();
    })

    it('should update the search text', () => {
        const { getByTestId } = render(<SearchTweet />);
        const inputElem = getByTestId('searchTxt');
        fireEvent.change(inputElem, { target: { value: '20'}});
        expect(inputElem.value).toBe('20');
    })

    it('should call searchTweet method on button click', () => {
        const searchTweetFn = jest.fn();
        const { getByTestId } = render(<SearchTweet searchTweet={searchTweetFn} />);
        const inputElem = getByTestId('searchTxt');
        const buttonElem = getByTestId('searchBtn');
        fireEvent.change(inputElem, { target: { value: 'tennis' }});
        fireEvent.click(buttonElem);
        expect(searchTweetFn).toHaveBeenCalledWith('tennis');
    })
})