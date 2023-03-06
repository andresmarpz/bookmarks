import { MicrolinkError } from '@microlink/mql'

type ErrorCode =
  | 'EBRWSRTIMEOUT'
  | 'EFATAL'
  | 'EFILENAME'
  | 'EFATALCLIENT'
  | 'EFORBIDDENURL'
  | 'EINVALURL'
  | 'EINVALURLCLIENT'
  | 'EMAXREDIRECTS'
  | 'ERATE'
  | 'ETIMEOUT'
export default function mapMicrolinkErrorToMessage(
  error: MicrolinkError & { code?: ErrorCode }
) {
  switch (error.code) {
    case undefined:
      return 'An unknown error occurred.'
    case 'EBRWSRTIMEOUT':
      return 'The URL provided reached the maximum browser navigation time allowed.'
    case 'EFATAL':
      return 'Resolved the target URL failed. Make sure your URL is valid and it has HTML content.'
    case 'EFATALCLIENT':
      return 'There is a network problem trying to reach the API.'
    case 'EFORBIDDENURL':
      return 'The URL is being resolved into an IP address whose range is not allowed.'
    case 'EINVALURL':
      return 'The target URL is considered not valid.'
    case 'EINVALURLCLIENT':
      return 'The target URL is considered not valid.'
    case 'EMAXREDIRECTS':
      return 'The target URL reached the maximum number of redirect after 10 times.'
    case 'ERATE':
      return 'Your daily rate limit has been reached. You need to wait or extend your plan.'
    case 'ETIMEOUT':
      return 'The request reached maximum timeout.'
  }
}
