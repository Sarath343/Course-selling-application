import { selector } from "recoil";
import { courseState } from "../atoms/courseState";

export const isCourseLoadingSelector = selector({
    key: 'isCourseLoadingSelector',
    get: ({ get }) => {
        const state = get(courseState);
        return state.isCourseLoading;

    }
})
export const courseDetailsSelector = selector({
    key: 'courseDetailsSelector',
    get: ({ get }) => {
        const state = get(courseState);
        return state.course;
    }
})
export const courseTitleSelector = selector({
    key: 'courseTitleSelector',
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course)
            return state.course.title;
        return "";
    }
})

export const courseDescSelector = selector({
    key: 'courseDescSelector',
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course)
            return state.course.description
        return "";
    }
})
export const coursePriceSelector = selector({
    key: 'coursePriceSelector',
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course)
            return state.course.price
        return "";
    }
})
export const imageLinkSlector = selector({
    key: 'imageLinkSlector',
    get: ({ get }) => {
        const state = get(courseState);
        if (state.course)
            return state.course.imageLink
        return "";
    }
})
