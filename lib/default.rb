# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
include Nanoc::Helpers::Rendering
include Nanoc3::Helpers::XMLSitemap

require('coderay');

CodeRay::Encoders::HTML::DEFAULT_OPTIONS[:line_number_anchors] = false
