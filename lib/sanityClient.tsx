import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId : '5kgykyv0',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: false,
    token: 'skULQonQaHmq1u8RkwO8jLs03N7CaYCTvVZFGE2d12OASBsGsQaJavg4EbXfQktq5nRhi4fYcuckYAwoJXC2UPDtFpg1b0u48uc2JQAjGm3N0qkGXUb4mFxTR9zcLoIs817F6FaEK4TmiFXSRcVGjPyhr9uexEKvqYxbMFUmb73k27zSJ1D7'
})