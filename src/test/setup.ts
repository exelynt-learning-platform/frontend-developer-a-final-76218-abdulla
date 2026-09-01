import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

try {
  const { vi } = require('vitest')
  if (vi) {
    ;(globalThis as any).jest = {
      fn: vi.fn,
      spyOn: vi.spyOn,
      clearAllMocks: vi.clearAllMocks,
      resetAllMocks: vi.resetAllMocks,
      mock: vi.mock,
    }
  }
} catch {
  // Jest environment
}
