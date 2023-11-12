import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import ErrorMessager from "../components/ErrorMessager";

describe('Error messager tests', async () => {
    screen.debug();
    it('ErrorMessage is rendered', async () => {
        render(<ErrorMessager />);
        await screen.findByRole('error_messager');
        const a = screen.getByRole('error_messager');
        expect(a).toHaveProperty('className');
        expect(a.getAttribute('class')).toBe('error');
    });
});